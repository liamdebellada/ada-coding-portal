const Docker = require('dockerode');
const fs = require('fs')
var docker = new Docker();

const sshKey = fs.readFileSync('/home/liamdebell/.ssh/id_rsa.pub', 'utf-8')

docker.createContainer({
  Image: 'krlmlr/debian-ssh:wheezy',
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
}, function(error, container) {
    if (error) {
      console.log(error)
    } else {
      console.log(container)
      container.start()
    }
})