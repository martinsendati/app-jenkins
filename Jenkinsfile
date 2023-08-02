pipeline {

    environment {
        APP_NAME = "marto-app"
        APP_TAG = "{BUILD_NUMBER}"
        USER_NAME = "martooo"
        USER_PASS = "arquitectura123"
        REPO_GIT = "https://github.com/martinsendati/app-jenkins"
        
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
                git branch: 'main', changelog: false, poll: false, url: "$REPO_GIT"
            }
        } 

        stage('buildear imagen') {
            steps {
                sh "docker build -t $USER_APP/$APP_NAME:$APP_TAG ." 
            }
        }

        stage('docker login') {
            steps {
                sh "docker login -u $USER_APP -p $USER_PASS"
            }
        }

        stage('docker push') {
            steps {
                sh "docker push $USER_NAME/$APP_NAME:$APP_TAG "
            }
        } 
    } 
}
