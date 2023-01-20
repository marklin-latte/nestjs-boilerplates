import { appConfig } from '../../config/application.config';

/**
 * @see https://cloud.google.com/pubsub/docs/admin#resource_names
 */
export function tenantNamingStrategy(tenantId: string) {
  return `projects/${
    appConfig.gcpPubsub.projectId
  }/topics/${appConfig.serviceName.toLowerCase()}_tenanted_${tenantId}`;
}
