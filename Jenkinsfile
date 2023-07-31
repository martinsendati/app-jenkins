pipeline {

    environment {
        APP_NAME = "marto-app"

    }

    agent {
       kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
metadata:
  labels:
    jenkins: slave
  name: agent-pod
spec:
  containers:
  - name: agent-container
    image: tferrari92/jenkins-inbound-agent-git-npm-docker
    command:
    - sleep
    args:
    - "99"
    env:
    resources:
      limits: {}
      requests:
        memory: "256Mi"
        cpu: "100m"
    volumeMounts:
    - mountPath: /var/run/docker.sock
      name: volume-0
      readOnly: false
    - mountPath: /home/jenkins/agent
      name: workspace-volume
      readOnly: false
  hostNetwork: false
  nodeSelector:
    kubernetes.io/os: "linux"
  restartPolicy: Never
  volumes:
  - emptyDir:
      medium: ""
    name: workspace-volume
  - hostPath:
      path: /var/run/docker.sock
    name: volume-0
'''
            defaultContainer 'agent-container'
        }
}
  
    stages {

        stage('Clonar repo') {
            steps {
               git branch: 'main', changelog: false, poll: false, url: 'https://github.com/martinsendati/app-jenkins'
            }
        } 

        stage('buildear imagen') {
            steps {
               sh "docker build -t marto-app ." 
            }
        }

        stage('docker push') {
            steps {
               sh "docker login -u martooo -p arquitectura123"
               sh "docker push martooo/marto-app "
            }
        }
        }



    
}
