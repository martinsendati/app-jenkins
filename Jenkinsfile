pipeline {

    environment {
        APP_NAME = "marto-app"
        USER_NAME = "martooo"
        APP_TAG = "{BUILD_NUMBER}"
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
               sh "docker build -t $USER_NAME:$APP_NAME:$APP_TAG ." 
            }
        }

        stage('docker tag') {
            steps {
               sh "docker tag marto-app:v1 $USER_NAME/$APP_NAME"
            }
        }

        stage('docker login') {
            steps {
               sh "docker login -u $USER_NAME -p arquitectura123"
            }
        }

        stage('docker push') {
            steps {
               sh "docker push $USER_NAME/$APP_NAME:$APP_TAG "
            }
        }
        }



    
}
