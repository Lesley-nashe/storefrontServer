import { GraphQLList, GraphQLObjectType, GraphQLInt, GraphQLSchema, GraphQLString, GraphQLFloat, } from "graphql";
const Product = new GraphQLObjectType({
    name: "product",
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        category: { type: GraphQLString },
        image: { type: GraphQLString },
    }),
});
const rootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        launches: {
            type: new GraphQLList(Product),
            async resolve(parent, args) {
                const products = await fetch("https://fakestoreapi.com/products");
                return products.json();
            },
        },
        launch: {
            type: Product,
            args: {
                id: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                const product = await fetch(`https://fakestoreapi.com/products/${args.id}`);
                return product.json();
            },
        },
    },
});
const productSchema = new GraphQLSchema({
    query: rootQuery,
});
export default productSchema;
