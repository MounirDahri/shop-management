import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService ){}

    async canActivate(context: ExecutionContext){

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if(!token){
            throw new UnauthorizedException();
        }
        try {
            
            const tokenPayload = await this.jwtService.verifyAsync(token);
            request.user = {
                id: tokenPayload.sub,
                email: tokenPayload.email,
                role: tokenPayload.role,
                name: tokenPayload.name
            }
            return true
        } catch(error){
            throw new UnauthorizedException();
        }
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
}