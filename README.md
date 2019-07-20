# graphql-subscriptions

Playing with subscriptions with GraphQL

## Installation

```bash
git clone git@github.com:cartrujillo/graphql-subscriptions.git
cd graphql-subscriptions
npm install
npm start
```

## Authentication

You can use the project `https://github.com/cartrujillo/graphql-auth` to get the token. Then put it on header:

> {"Authorization": your_token}

## Usage

1. Go to http://localhost:3031/graphql
2. Create a subscription:
```
subscription
{
  eventAdded
  {
    zircoins
    eventActivity
  }
}
```
3. Add mutation that launches subscription:
```
mutation
{
  addEvent(event: 
    {
    eventActivity: "course6",
    email: "carla.trujillo@bluetab.net",
    zircoins: 11
    })
  {
    eventActivity
    _id
  }
}
```
4. Check changes:
```
{
  users
  {
    email
    zircoins
   }
}
```
