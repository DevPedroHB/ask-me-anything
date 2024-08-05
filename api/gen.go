package gen

//go:generate go run .\cmd\terndotenv\main.go
//go:generate sqlc generate -f .\internal\pgstore\sqlc.yaml
