## Resolvers

1. **parent**: The parent is the return value of the previous resolver in the resolver chain. For top-level resolvers, the parent is undefined, because no previous resolver is called. For example, when making a enrollment query, the query.enrollment() resolver will be called with parent’s value undefined and then the resolvers of Student will be called where parent is the object returned from the enrollment resolver.

2. **args**: This argument carries the parameters for the query, for example, the student query, will receive the id of the student to be fetched. Instead of using the object key value pairs, I like using destructuring synax to easily access input parameters.

3. **context**: An object that gets passed through the resolver chain that each resolver can write to and read from, which allows the resolvers to share information.

4. **info**: An AST representation of the query or mutation. You can read more about the details in part III of this series: [Demystifying the info Argument in GraphQL Resolvers](https://www.prisma.io/blog/graphql-server-basics-demystifying-the-info-argument-in-graphql-resolvers-6f26249f613a)
