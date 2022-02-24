FROM golang:alpine3.8 as build
WORKDIR /app
COPY full_cycle.go .
RUN go build  -ldflags="-s -w" full_cycle.go


FROM scratch as prod
WORKDIR /app
COPY --from=build /app/full_cycle .
ENTRYPOINT [ "./full_cycle" ]