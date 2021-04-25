const Docker = require('dockerode');
const fs = require('fs');

var docker = new Docker();
var image = 'mmumshad/ubuntu-ssh-enabled';
var user = "liamdebell";

// Create a new container

exports.createContainer = function (id: string, dir: string, socketOwner: boolean) {
    const sshKey = fs.readFileSync(`/home/${user}/.ssh/id_rsa.pub`, 'utf-8');
    const port = Math.floor(Math.random() * (65535 - 0) + 0).toString()
    const rw = socketOwner ? 'Z' : 'ro'
    return new Promise((resolve, reject) => {
        docker.createContainer({
            Image: image,
            name: id,
            ExposedPorts: {
                '22/tcp': {}
            },
            Hostconfig: {
                PortBindings: {
                    '22/tcp': [{
                        HostPort: port,
                    }],
                },
                Binds: [`${dir}:/root/challenges:${rw}`]
            }
        }, function (error: Error, container: any) {
            if (error) {
                reject(error)
            } else {
                container.start()
                resolve({
                    user: "root",
                    port: port,
                    address: "localhost"
                })
            }
        })
    })
}

// Displays running containers aggregated to LB

exports.listContainers = async function () {

    return new Promise((resolve, reject) => {

        docker.listContainers({
            all: "true",
        }, function (error: Error, containers: any) {
            if (error) {
                reject(false);
            } else {
                resolve(containers.filter((container: any) => container.Image == image));
            }
        });
    });

}

//finds container by name

exports.findContainerByID = async function (id: string) {

    return new Promise((resolve, reject) => {
        docker.listContainers({
            all: "true",
        }, function (error: Error, containers: any) {
            if (error) {
                reject(false);
            } else {
                resolve(containers.filter((container: any) => {
                    return container.Names[0] == `/${id}`
                }));
            }
        });
    });

}

// Stop a single container, asks user for the container ID

exports.stopContainer = function (containerID: any) {
    return new Promise((resolve, reject) => {

    var container = docker.getContainer(containerID);
        container.stop(function (error: Error, data: any) {
            if (error) {
                reject(error)
            } else {
                resolve(data)
            }
        });
    })
}

// Removes a single container, asks user for the container ID

exports.removeContainer = function (containerID: any) {
    return new Promise((resolve, reject) => {
        var container = docker.getContainer(containerID);

        container.remove(function (error: Error, data: any) {
            if (error) {
                reject(error)
            } else {
                resolve(data)
            }
        });
    })
}

// Stops all running containers

exports.stopAllContainers = function () {

    docker.listContainers(function (err: Error, containers: any) {
        containers.forEach(function (containerInfo: any) {
            if (containerInfo.Image == image) {
                docker.getContainer(containerInfo.Id).stop();
            }
        });
    });

}

// Removes all containers

exports.removeAllContainers = function () {

    docker.listContainers(function (err: Error, containers: any) {
        containers.forEach(function (containerInfo: any) {
            if (containerInfo.Image == image) {
                docker.getContainer(containerInfo.Id).remove();
            }
        });
    });

}