# graphql-subscriptions

Playing with subscriptoin with GraphQL

## Installation

```bash
git clone <repo>
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
3. Add mutation link to subscription:
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
