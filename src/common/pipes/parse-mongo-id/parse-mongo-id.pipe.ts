import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

//nest g pi common/parseMongoId

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {

  transform(value: string, metadata: ArgumentMetadata) {

    /*if (metadata.type !== 'param' || !value) {
      return value;
    }*/
    if (!isValidObjectId(value)){
      throw new BadRequestException(`${value} Is Not a Valid MongoID`);
    }
    return value;
  }
}
