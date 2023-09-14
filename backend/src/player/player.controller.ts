import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { Player } from '../entities/player.entity';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}
  @Get()
  read(): Promise<Player[]> {
    return this.playerService.readAll();
  }

  @Post('create')
  async create(@Body() player: Player): Promise<any> {
    return this.playerService.create(player);
  }

  @Patch(':id/update')
  async update(@Param('id') id, @Body() player: Player): Promise<any> {
    player.id = Number(id);
    return this.playerService.update(player);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.playerService.delete(id);
  }
}
