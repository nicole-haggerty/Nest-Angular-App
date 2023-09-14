import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Player, TypeModal } from './models/player';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  players: Player[] = [];
  modalShow: Boolean = false;
  form!: FormGroup;
  invalidForm: boolean = false;
  type:string = '';


  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      position: ['', Validators.required],
      team: ['', Validators.required],
      nationality: ['', Validators.required],
    });
    this.getPlayers();

  }
  
  getPlayers(): void{
    this.appService.getProfile().subscribe(player => {
      this.players = player;
    });

  }

  deletePlayer(id: number): void{
    this.appService.delete(id).subscribe({
      next: () => {
        this.getPlayers();
      },
    });
  }

  updatePlayer(): void{
    const playerUpdate: Player = {
      id: this.form.value.id,
      name: this.form.value.name,
      position: this.form.value.position,
      nationality: this.form.value.nationality,
      team: this.form.value.team
    }
    this.appService.update(playerUpdate.id, playerUpdate).subscribe({
      next: () => {
        this.getPlayers();
        this.invalidForm = false;
        this.modalShow = false;
        this.form.reset();
      },
    });
  }

  prepEdit(player:Player){
    this.form.patchValue({id: player.id});
    this.form.patchValue({name: player.name});
    this.form.patchValue({position: player.position});
    this.form.patchValue({team: player.team});
    this.form.patchValue({nationality: player.nationality});

    this.toggleModal('Update');
  }


  toggleModal(typeModal: string){
    this.type = typeModal;
    this.modalShow = !this.modalShow;
    this.invalidForm = false;
  }

  createPlayer(): void{
    if (this.form.invalid){
      this.invalidForm = true;
    }else{ 
      const playerCreate: Player = {
        id: Math.floor((Math.random()*6)+1),
        name: this.form.value.name,
        position: this.form.value.position,
        nationality: this.form.value.nationality,
        team: this.form.value.team
      }
      this.appService.create(playerCreate).subscribe({
        next: () => {
          this.getPlayers()
          this.invalidForm = false;
          this.modalShow = false;
        },
      });
    }
  }
}
