import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server'
import { Plugin } from '@nestjs/apollo'
import { format } from 'date-fns'

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    const start = new Date()
    return {
      async willSendResponse(context) {
        if (context.operationName != 'IntrospectionQuery') {
          const timestamp = format(new Date(), 'MM/dd/yyyy, hh:mm:ss a')
          const response =
            new Date().getMilliseconds() - start.getMilliseconds()
          context.logger.info(
            `${timestamp} - ${context.operation?.operation.toUpperCase()}: ${context
              .operation?.name?.value} - [${JSON.stringify(
              context.request.variables,
            )}] +${response}ms`,
          )
        }
      },
    }
  }
}
