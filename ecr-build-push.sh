aws ecr get-login-password --region ap-southeast-2 --profile manz-amplify | docker login --username AWS --password-stdin 305249519122.dkr.ecr.ap-southeast-2.amazonaws.com/aroha
docker build -t aroha .
docker tag aroha:latest 305249519122.dkr.ecr.ap-southeast-2.amazonaws.com/aroha:latest
docker push 305249519122.dkr.ecr.ap-southeast-2.amazonaws.com/aroha:latest