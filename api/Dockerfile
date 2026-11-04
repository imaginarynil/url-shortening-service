FROM maven:3.10.0-eclipse-temurin-27-alpine AS build

WORKDIR /api

COPY ./pom.xml /api
COPY ./src /api/src

RUN mvn clean package -D maven.test.skip=true

FROM eclipse-temurin:27-jdk-alpine

VOLUME /tmp

WORKDIR /api

COPY --from=build /api/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]

# References
# https://medium.com/@yasiffkhan/using-docker-with-spring-boot-comprehensive-guide-d90ad94d2dcf
# https://medium.com/@thearaseng/building-a-full-stack-product-app-with-react-spring-boot-and-docker-compose-64a47f4a1080
# https://github.com/jhordyess/dockerized-spring-react-mysql/tree/main
