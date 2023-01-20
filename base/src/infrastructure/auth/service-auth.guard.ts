import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { appConfig } from '../../config/application.config';

@Injectable()
export class ServiceAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, serviceInfo, info) {
    if (
      err ||
      !serviceInfo ||
      !appConfig.serviceAuth.allowedServices.includes(serviceInfo.service)
    ) {
      throw err || new UnauthorizedException();
    }
    return serviceInfo;
  }
}
