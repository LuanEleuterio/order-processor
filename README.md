# Order Processor

API para processamento de pedidos em flat positional txt

# Índice

- [Documentação](#documentação)
- [MongoDB](#mongodb)
- [Desenho API](#desenho-api)
- [Iniciar Aplicação](#iniciar-aplicação)
- [Endpoints](#endpoints)


## Documentação

### Arquitetura Package by Feature e MVCS

Utilizei a arquitetura [Package by Feature](https://medium.com/@vitorbritto/the-package-by-feature-approach-c62a197a8a3d) com MVCS para separar de forma independente e clara cada parte do meu sistema (Pedidos e usuarios) em packages com o uso do MVCS. A adoção dessa forma foi decidida para trazer simplicidade e coesão para cada package e menos aclopamento entre ambos.

Em cada package, conta com controllers, entities (model), repositories e services. Estabelecendo um fluxo de [MVCS](https://quantiphi.com/an-introduction-to-mvcs-architecture/)

![image](https://i.imgur.com/VVgZ5Ta.png)

### SOLID

Os principais principios contidos neste repositorio sao:

- Single Responsability
- Interface Segregation
- Depency Inversion

#### Single Responsability
Cada service de cada package assumiu unicamento uma responsabilidade, seja para abrir o arquivo txt e processar linha por linha, seja para montar a estrututura para salvar no banco ou para listar os pedidos.

#### Interface Segregation
Toda comunicação com os services e repositories acontecem por meio de interfaces estabelecidas como contrato. Fugindo assim da implementação do service, e dependendo somente de interfaces.

#### Depency Inversion
Todos as classes do repositorio que dependem de outras classes recebem estas em seus construtores afim de aplicar o principio de inversão

## MongoDB
A adoção do MongoDB foi pensada para buscar a simplicidade para lidar com os pedidos, tendo em vista que os arquivos .txt de pedidos contem produtos de mesmo ID com preços diferentes, podendo ser interpretado como um historico de pedidos e produtos

#### Estrutura Pedidos e Usuarios

Toda vez que um pedido é busca, um referencia entre documentos é feito e o usuario pertencente ao pedido tambem é buscado.

Pedido
```bash
{
  "_id": "ObjectId";
  "user_id" "ObjectId";
  "order_id": "number";
  "date": "Date";
  "total": "string";
  "products": {
    "product_id": "number";
    "value": "string";
  }[];
}
```
Usuario
```bash
{
  "_id": "ObjectId";
  "user_id" "number";
  "name": "string";
}
```

## Desenho API

#### /order/file/upload
![Order File Upload](https://i.imgur.com/2Jo8mLg.png)

#### /orders
![List Orders](https://i.imgur.com/lOZQQBE.png)

## Iniciar aplicação

Necessario:
- docker
- docker-compose

Iniciar aplicação
```bash
docker-compose up
```

Testes
```bash
yarn test:cov
```

## Endpoints

#### Upload do arquivo .txt
```http
POST /orders/file/upload
```

|  | Parametro | Tipo     | Descrição                |
| :-------- | :-------- | :------- | :------------------------- |
| `form-data`| `file` | `File` | **Required**. Arquivo .txt |

#### Exemplo de request:
```bash
  curl -X POST \
  -F "file=@caminho/do/seu/arquivo.txt" \
  http://localhost:3000/orders/file/upload

```

#### Exemplo de retorno: 
```bash
{
    "message": "File uploaded successfully"
}
```
#### Exceptions
| HTTP Code | Mensagem     | Descrição                       |
| :-------- | :------- | :-------------------------------- |
| `400`      | `Bad Request` | Only .txt files are allowed |
| `400`      | `Bad Request` | Empty file |


#### Listar pedidos
```http
GET /orders?order_id=&start_date=&end_date=
```

|  | Parametro | Tipo     | Descrição                |
| :-------- | :-------- | :------- | :------------------------- |
| `Query params`| `number` | `order_id` | **Opcional** |
| `Query params`| `string` | `start_date` | **Opcional** 'yyyy-mm-dd' |
| `Query params`| `string` | `end_date` | **Opcional** 'yyyy-mm-dd' |

#### Exemplo de request:
```bash
  curl -X GET \
  http://localhost:3000/orders?start_date=2021-10-18&end_date=2021-10-18&order_id=73

```

#### Exemplo de retorno: 
```bash
[
    {
        "user_id": 7,
        "name": "Magdalena Kub",
        "orders": [
            {
                "order_id": 73,
                "date": "2021-10-18",
                "total": "1740.13",
                "products": [
                    {
                        "product_id": 2,
                        "value": "423.07"
                    },
                    {
                        "product_id": 0,
                        "value": "1317.06"
                    }
                ]
            }
        ]
    }
]
```
#### Observacao
Quando não é encontrado nenhum registro, é devolvido um array vazio ([])
