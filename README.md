# graphql-subscriptions

Playing with subscriptions with GraphQL

## Installation

```bash
git clone git@github.com:cartrujillo/graphql-subscriptions.git
cd graphql-subscriptions
npm install
npm start
```

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
