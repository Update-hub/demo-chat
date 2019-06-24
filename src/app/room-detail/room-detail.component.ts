import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { Observable } from 'rxjs';
import { Room } from '../interfaces/room';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  isLoading: boolean;
  isEditorOpen: boolean;
  room$: Observable<Room>;

  roomControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(20),
  ]);

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.room$ = this.chatService.getRoom(params.roomId).pipe(
        tap(room => this.isLoading = false)
      );
    });
  }

  deleteRoom(id: string) {
    this.chatService.deleteRoom(id)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(erro => {
        console.log(erro);
      });
  }

  editRoom(id: string) {
    if (this.roomControl.valid) {
      this.chatService.editRoom(id, this.roomControl.value).then(() => {
        this.isEditorOpen = false;
        this.snackBar.open('編集しました', null, {
          duration: 2000
        });
      });
    }
  }

  openEditor(oldName: string) {
    this.isEditorOpen = true;
    this.roomControl.setValue(oldName);
  }

}
