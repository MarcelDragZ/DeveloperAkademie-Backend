import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'scrumapp-profile-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ColorPickerModule],
  template: ` <div
      class="flex justify-between flex-col md:flex-row  items-center m-5 border-userColor border-b-2 rounded"
    >
      <div
        class="flex flex-col md:flex-row text-center md:text-left items-center m-5"
      >
        <img class="w-44 rounded-full" src="/assets/avatar_priminity.png" />
        <div
          class="flex flex-col justify-around md:ml-5 text-white font-bold md:h-36"
        >
          <div>
            <span>{{ editTeamMember.position }}</span>
            <div class="flex flex-col">
              <input
                *ngIf="editProfile"
                class="bg-transparent border-b-2 border-userColor rounded mt-2"
                type="text"
                name="editTeamMember.name"
                [(ngModel)]="editTeamMember.name"
              />
              <input
                *ngIf="editProfile"
                class="bg-transparent border-b-2 border-userColor rounded mt-2"
                type="text"
                name="editTeamMember.userName"
                [(ngModel)]="editTeamMember.userName"
              />
              <span *ngIf="!editProfile"
                >{{ editTeamMember.name }} {{ editTeamMember.userName }}</span
              >
            </div>
          </div>
          <span class="mt-5" *ngIf="editProfile">Wähle Farbschema</span>
          <input
            class="rounded cursor-pointer"
            *ngIf="editProfile"
            [cpAlphaChannel]="'disabled'"
            [(colorPicker)]="editTeamMember.colorScheme!"
            [style.background]="editTeamMember.colorScheme"
          />
        </div>
      </div>
      <div class="m-5 text-white font-bold">
        <div class="flex justify-between">
          <button
            *ngIf="editProfile"
            (click)="saveEditProfile()"
            class="bg-userColor w-2/4 rounded p-0.5 hover:opacity-80 transition-all mr-2"
          >
            Speichern
          </button>
          <button
            *ngIf="editProfile"
            (click)="toggleEditProfile()"
            class="bg-userColor w-2/4 rounded p-0.5 hover:opacity-80 transition-all"
          >
            Abbrechen
          </button>
        </div>
        <div class="flex flex-col">
          <button
            *ngIf="!editProfile"
            (click)="toggleEditProfile()"
            class="bg-userColor rounded p-0.5 hover:opacity-80 transition-all"
          >
            Profil bearbeiten
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row justify-around m-5 text-white">
      <div class="flex flex-col w-1/4">
        <span class="text-userColor font-bold mb-5">Informationen</span>

        <div *ngIf="!editProfile" class="flex flex-col">
          <span>Email:</span>
          <span class="mb-4">{{ editTeamMember.email }}</span>
        </div>
        <div *ngIf="editProfile" class="flex flex-col">
          <span>Email:</span>
          <input
            class="bg-transparent border-b-2 border-userColor w-2/3 rounded mt-2 mb-4"
            type="text"
            name="editTeamMember.email"
            [(ngModel)]="editTeamMember.email"
          />
        </div>

        <div *ngIf="!editProfile" class="flex flex-col">
          <span>Telefon:</span>
          <span class="mb-4">{{ editTeamMember.phone }}</span>
        </div>
        <div *ngIf="editProfile" class="flex flex-col">
          <span>Telefon:</span>
          <input
            class="bg-transparent border-b-2 border-userColor w-2/3 rounded mt-2 mb-4"
            type="text"
            name="editTeamMember.phone"
            priminityRestrictNumbers
            [(ngModel)]="editTeamMember.phone"
          />
        </div>

        <div *ngIf="!editProfile" class="flex flex-col">
          <span>Geburtstag:</span>
          <span class="mb-4">{{ editTeamMember.birth }}</span>
        </div>
        <div *ngIf="editProfile" class="flex flex-col">
          <span>Geburtstag:</span>
          <input
            class="bg-transparent border-b-2 border-userColor w-2/3 rounded mt-2 mb-4"
            type="date"
            name="editTeamMember.birth"
            [(ngModel)]="editTeamMember.birth"
          />
        </div>
      </div>
      <div class="flex flex-col w-1/4">
        <span class="text-userColor font-bold mb-5">Social</span>
        <div *ngIf="!editProfile" class="flex flex-col">
          <span>LinkedIn:</span>
          <span class="mb-4">{{ editTeamMember.email }}</span>
        </div>
        <div *ngIf="editProfile" class="flex flex-col">
          <span>LinkedIn:</span>
          <input
            class="bg-transparent border-b-2 border-userColor w-2/3 rounded mt-2 mb-4"
            type="text"
            name="editTeamMember.email"
            [(ngModel)]="editTeamMember.email"
          />
        </div>

        <div *ngIf="!editProfile" class="flex flex-col">
          <span>Github:</span>
          <span class="mb-4">{{ editTeamMember.linkedin }}</span>
        </div>
        <div *ngIf="editProfile" class="flex flex-col">
          <span>Github:</span>
          <input
            class="bg-transparent border-b-2 border-userColor w-2/3 rounded mt-2 mb-4"
            type="text"
            name="editTeamMember.phone"
            priminityRestrictNumbers
            [(ngModel)]="editTeamMember.github"
          />
        </div>
      </div>
    </div>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileProfileComponent {
  editTeamMember = {
    name: 'Marcel',
    userName: 'Herzog',
    email: 'marcelhe98@gmx.de',
    position: 'Admin',
    phone: '015221752348',
    birth: '31.08.1998',
    colorScheme: 'gesundheit',
    linkedin: 'url',
    github: 'url',
  };

  editProfile = false;

  saveEditProfile() {
    console.log('test');
  }

  toggleEditProfile() {
    if (this.editProfile) {
      this.editProfile = false;
    } else {
      this.editProfile = true;
    }
  }
}
