const { createContainer, findContainerByID, removeContainer, stopContainer } = require('../container-manager/lb')
const sshClient = require('ssh2').Client 
interface containerInfo {
    user: string,
    port: number,
    address: string
}

module.exports = function(socket: any) {
    var conn = new sshClient();
    socket.on('setupContainer', (data: object) => {
        createContainer(socket.request.user.account.id).then((data: containerInfo) => {
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
                                createContainer(socket.request.user.account.id).then((data: containerInfo) => {
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
            stopContainer(container[0].Id).then(() => {
                removeContainer(container[0].Id).catch()
            }).catch()
        }).catch()
    })

    socket.on('connectContainer', (data: any) => {
        conn.on('ready', () => {
            console.log("connected")
            conn.shell(function(err: Error, stream: any) {
                if (err)
                    return socket.emit('data', '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n');
                socket.on('interactWithContainer', function(data: any) {
                    stream.write(data);
                });
                stream.on('data', function(d: any) {
                    socket.emit('commandResponse', d.toString('binary'));
                }).on('close', function() {
                    conn.end();
                });
            });
        }).on('error', function(err: Error) {
            console.log(err)
        }).connect({
                host: socket.request.sshInfo.address,
                username: socket.request.sshInfo.user,
                port: socket.request.sshInfo.port,
                privateKey: require('fs').readFileSync('/home/liamdebell/.ssh/id_rsa')
        })
    })

    // socket.request.sshSession.on('ready', () => {
    //     socket.emit('containerInfo', {type:"connected"})
    // }).connect({
    //     host: socket.request.sshInfo.address,
    //     username: socket.request.sshInfo.user,
    //     port: socket.request.sshInfo.port,
    //     privateKey: require('fs').readFileSync('/home/liamdebell/.ssh/id_rsa')
    // })
}