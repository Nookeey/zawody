import { Competition } from './../core/models/competition';
import { ParticipantService } from './../core/services/participant.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Participant } from '../core/models/participant';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public participant$: Observable<any[]>;

  participantForm: FormGroup;
  participant = new Participant();
  competition = new Competition();

  constructor(private participantService: ParticipantService) { }

  ngOnInit() {
    this.participantForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.participant$ = this.getParticipant();
  }

  getParticipant() {
    return this.participantService.getParticipant();
  }

  createParticipant() {
    this.competition.karne = 0;
    this.competition.kosz = 0;
    this.participant.name = this.participantForm.value.name;
    this.participant.competition = this.competition;
    console.log(this.competition);
    console.log(this.participant);
    this.participantService.create(this.participant);
    this.onReset();
  }

  onReset() {
    this.participantForm.reset();
  }

}
