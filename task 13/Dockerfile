# Stage 1: Build the Maven application
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
# Download dependencies first (cached layer)
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests

# Stage 2: Runtime image
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/gateway-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
