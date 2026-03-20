import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class UsersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Si c'est un tableau d'utilisateurs
        if (Array.isArray(data)) {
          return data.map(({ password: _password, ...user }) => user);
        }
        
        // Si c'est un seul utilisateur
        if (data && typeof data === 'object') {
          const { password: _password, ...user } = data;
          return user;
        }
        
        // Retourne les données inchangées si ce n'est ni un objet ni un tableau
        return data;
      })
    );
  }
}