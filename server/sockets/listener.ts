const { createContainer, findContainerByID, removeContainer, stopContainer } = require('../container-manager/lb')
const sshClient = require('ssh2').Client 

interface containerInfo {
    user: string,
    port: number,
    address: string
}

interface challenge {
    id: string,
    submission: string
}

const parseUrlOwnership = (url: string, userProfile: any) => {
    let values = url.split('/')
    let id = values[values.length - 1]
    let challenges = userProfile.challenges.filter((challenge: challenge) => {
        return challenge.submission == id;
    })
    return challenges.length == 1 ? true : false
}

module.exports = function(socket: any) {
    var conn = new sshClient();
    socket.on('setupContainer', (data: object) => {
        var socketOwner = parseUrlOwnership(socket.handshake.headers.referer, socket.request.user)
        createContainer(socket.request.user.account.id, socket.request.user.userSpaceDirectory, socketOwner).then((data: containerInfo) => {
            socket.request.sshInfo = data;
            socket.emit("containerInfo", data)
        }).catch((error: any) => {
            if (error.statusCode == 409) {
                //container already exists
                findContainerByID(socket.request.user.account.id).then((container: any) => {
                    if (container[0]) {
                        if (container[0].State == 'running') {
                            let containerObj = {
                                user: "root",
                                port: container[0].Ports[0].PublicPort,
                                address: "localhost"
                            }
                            socket.request.sshInfo = containerObj;
                            socket.emit("containerInfo", containerObj)
                        } else {
                            removeContainer(container[0].Id).then((data: any) => {
                                createContainer(socket.request.user.account.id, socket.request.user.userSpaceDirectory, socketOwner).then((data: containerInfo) => {
                                    socket.request.sshInfo = data;
                                    socket.emit("containerInfo", data)
                                }).catch(() => {
                                    socket.emit("containerInfo", {"error" : "there was an error creating your user space."})
                                })
                            }).catch((error: Error) => {
                                socket.emit("containerInfo", {"error" : "failed to stop workspace."})
                            })
                        }
                    }
                })
            }
        })
    })

    socket.on('disconnect', () => {
        findContainerByID(socket.request.user.account.id).then((container: any) => {
            if (container[0]) {
                stopContainer(container[0].Id).then(() => {
                    removeContainer(container[0].Id).catch()
                }).catch()
            }
        }).catch()
    })

    socket.on('connectContainer', (data: any) => {
        conn.on('ready', () => {
            conn.shell(function(err: Error, stream: any) {
                if (err)
                    return socket.emit('data', '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n');

                stream.write('cd challenges\r')

                //handle resize by rows and cols (event fired by height adjustment)
                socket.on('resizeContainer', function(data: any) {
                    stream.setWindow(data.rows, data.cols)
                })
                
                socket.on('interactWithContainer', function(data: any) {
                    if (stream.writable) {
                        stream.write(data);
                    }
                });

                stream.on('data', function(d: any) {
                    socket.emit('commandResponse', d.toString('binary'));
                }).on('close', function() {
                    conn.end();
                });
            });
        }).on('error', function(err: Error) {
            return;
        }).connect({
                host: socket.request.sshInfo.address,
                username: socket.request.sshInfo.user,
                port: socket.request.sshInfo.port,
                password: 'Passw0rd'
        })
    })

    socket.on('stopContainer', () => {
        findContainerByID(socket.request.user.account.id).then((container: any) => {
            stopContainer(container[0].Id).then(() => {
                removeContainer(container[0].Id).then(() => {
                    socket.emit('containerInfo', {"message" : "Container removed.", "terminated" : true})
                }).catch(() => {
                    socket.emit('containerInfo', {"error" : "There was a problem removing your container."})
                })
            }).catch(() => {
                socket.emit('containerInfo', {"error" : "There was a problem stopping your container."})
            })
        }).catch(() => {
            socket.emit('containerInfo', {"error" : "There are no containers to stop."})
        })
    })

    socket.on('regenContainer', () => {
        conn.end(); //end previous ssh session.
        conn = new sshClient(); //over-write session with new session to prevent redundant connections.
        findContainerByID(socket.request.user.account.id).then((container: any) => {
            stopContainer(container[0].Id).then(() => {
                removeContainer(container[0].Id).then(() => {
                    var socketOwner = parseUrlOwnership(socket.handshake.headers.referer, socket.request.user)
                    createContainer(socket.request.user.account.id, socket.request.user.userSpaceDirectory, socketOwner).then((data: containerInfo) => {
                        socket.request.sshInfo = data;
                        socket.emit("containerInfo", data)
                    }).catch(() => {
                        socket.emit("containerInfo", {"error" : "Unable to create new container"})
                    })
                }).catch(() => {
                    socket.emit('containerInfo', {"error" : "There was a problem removing your container."})
                })
            }).catch(() => {
                socket.emit('containerInfo', {"error" : "There was a problem stopping your container."})
            })
        }).catch(() => {
            var socketOwner = parseUrlOwnership(socket.handshake.headers.referer, socket.request.user)
            createContainer(socket.request.user.account.id, socket.request.user.userSpaceDirectory, socketOwner).then((data: containerInfo) => {
                socket.request.sshInfo = data;
                socket.emit("containerInfo", data)
            }).catch(() => {
                socket.emit("containerInfo", {"error" : "Unable to create new container"})
            })
        })
    })
}