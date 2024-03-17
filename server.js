const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema, resolvers } = require('./router/graphql');
const { connectedDB } = require("./config/db");
const { userRouter } = require("./router/userRouter");
const { authMiddleware } = require("./middleware/authenticate");
const { postRouter } = require("./router/postRouter");
const { relationshipRouter } = require("./router/userRelationshipRoute");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        res.send("Home-Page");
    } catch (error) {
        console.log(`Error:${error}`);
    }
});

app.use("/user", userRouter);

app.use(authMiddleware);
app.use("/post", postRouter);
app.use("/relation", relationshipRouter);

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true // Enable GraphiQL interface for testing
}));

const port = process.env.PORT || 8080;
app.listen(port, async () => {
    try {
        await connectedDB;
        console.log("Database connected Successfully");
    } catch (err) {
        console.log(err.message);
    }
    console.log(`server is running on port ${port}`);
});
