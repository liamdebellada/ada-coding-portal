const Docker = require('dockerode');
const fs = require('fs');

var docker = new Docker();
var image = 'krlmlr/debian-ssh:wheezy';

// Create a new container

exports.createContainer = function () {
    const sshKey = fs.readFileSync('/home/bruno/.ssh/id_rsa.pub', 'utf-8');

    docker.createContainer({
        Image: image,
        name: Math.random().toString(),
        ExposedPorts: {
            '22/tcp': {}
        },
        Hostconfig: {
            PortBindings: {
                '22/tcp': [{
                    HostPort: parseInt((Math.random() * (65535 - 0) + 0)).toString(),
                }],
            }
        },
        Env: [`SSH_KEY=${sshKey}`]
    }, function (error, container) {
        if (error) {
            console.log(error)
        } else {
            console.log(container)
            container.start()
        }
    })
}

// Displays running containers aggregated to LB

exports.listContainers = async function () {

    return new Promise((resolve) => {

        docker.listContainers({
            all: "true",
        }, function (error, containers) {

            if (error) {
                console.log(error)
            } else {
                containers.forEach(function (containerInfo) {
                    if (containerInfo.Image === image) { // Check if container belongs to LB
                        console.log("-------------------\n" +
                            "ID: " + containerInfo.Id.toString() + "\n" +
                            "State: " + containerInfo.State.toString() );
                    }
                });
            }

            resolve();
        });
    });

}

// Stop a single container, asks user for the container ID

exports.stopContainer = function (containerID) {

    var container = docker.getContainer(containerID);

    container.stop(function (error, data) {
        if (error) {
            console.log(error)
        } else {
            console.log(data);
        }
    });

}

// Removes a single container, asks user for the container ID

exports.removeContainer = function (containerID) {

    var container = docker.getContainer(containerID);

    container.remove(function (error, data) {
        if (error) {
            console.log(error)
        } else {
            console.log(data);
        }
    });

}

// Stops all running containers

exports.stopAllContainers = function () {

    docker.listContainers(function (err, containers) {
        containers.forEach(function (containerInfo) {
            if (containerInfo.Image == image) {
                docker.getContainer(containerInfo.Id).stop();
            }
        });
    });

}

// Removes all containers

exports.removeAllContainers = function () {

    docker.listContainers(function (err, containers) {
        containers.forEach(function (containerInfo) {
            if (containerInfo.Image == image) {
                docker.getContainer(containerInfo.Id).remove();
            }
        });
    });

}