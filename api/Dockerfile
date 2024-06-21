# Utilitzem una imatge base d'Alpine per a la seva lleugeresa
FROM golang:1.22-alpine

# Establim el directori de treball dins del contenidor
WORKDIR /app

# Copiem el fitxer de dependències
COPY go.mod .

# Descarreguem les dependències
RUN go mod download

# Copiem la resta del codi de l'aplicació
COPY . .

# Construïm l'aplicació
RUN go build -o main .

# Exposem el port 8080 en què s'escoltarà l'aplicació
EXPOSE 8080

# Comandament per executar l'aplicació
CMD ["./main"]
