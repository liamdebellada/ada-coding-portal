const { createContainer, findContainerByID, removeContainer, stopContainer } = require('../container-manager/lb')

interface containerInfo {
    user: string,
    port: number,
    address: string
}

module.exports = function(socket: any) {
    socket.on('setupContainer', (data: object) => {
        createContainer(socket.request.user.account.id).then((data: containerInfo) => {
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
                            socket.emit("containerInfo", containerObj)
                        } else {
                            removeContainer(container[0].Id).then((data: any) => {
                                createContainer(socket.request.user.account.id).then((data: containerInfo) => {
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
    }),

    socket.on('disconnect', () => {
        findContainerByID(socket.request.user.account.id).then((container: any) => {
            stopContainer(container[0].Id).then(() => {
                removeContainer(container[0].Id).catch()
            }).catch()
        }).catch()
    })
}