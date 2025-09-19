import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';
import { ChatService } from 'src/app/services/chatService.service';

@Component({
  selector: 'app-gpt',
  standalone: true,
  imports: [RouterModule, MaterialModule, NgIf, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './starter.component.html',
})
export class StarterComponent {
  prompt: string = '';
  currentResponse: string = '';
  userId: string = '';
  isLoading = false;
  chatHistory: { sender: 'user' | 'ai'; message: string | SafeHtml }[] = [];

  @Output() chatSaved = new EventEmitter<any>();

  // Inside your GptComponent
  formattedResponse: SafeHtml = '';

  constructor(private chatService: ChatService, private sanitizer: DomSanitizer, private cdRef: ChangeDetectorRef) { }
  private formatResponse(text: string): SafeHtml {
    const withLineBreaks = text.replace(/\n/g, '<br>');
    const withBold = withLineBreaks.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    return this.sanitizer.bypassSecurityTrustHtml(withBold);
  }

  sendPrompt() {
    if (!this.prompt.trim()) return;

    this.chatHistory.push({ sender: 'user', message: this.prompt });
    this.currentResponse = '';
    this.formattedResponse = '';
    this.isLoading = true;

    const currentPrompt = this.prompt; // Store it to preserve during async flow
    this.prompt = ''; // Clear input early to reset UI input

    // this.profileService.getUserProfile().subscribe({
    //   next: (profile) => {
    //     this.userId = profile.id;

        this.chatService.streamChat(this.userId, currentPrompt).subscribe({
          next: (chunk: any) => {
            try {
              const data = JSON.parse(chunk);
              this.currentResponse += data.response;
              this.formattedResponse = this.formatResponse(this.currentResponse);
              this.cdRef.detectChanges(); // 🔁 Update UI with streamed response
            } catch (e) {
              console.error('Invalid chunk:', chunk);
            }
          },
          complete: () => {
            this.isLoading = false;
            this.chatHistory.push({ sender: 'ai', message: this.formattedResponse });
            this.chatSaved.emit({ prompt: currentPrompt, response: this.currentResponse });
            this.cdRef.detectChanges(); // 🔁 Final update
          },
          error: (err) => {
            this.isLoading = false;
            console.error('Streaming error:', err);
          }
        });
      // },
    //   error: (error) => {
    //     this.isLoading = false;
    //     console.error('Error fetching profile info:', error);
    //   }
    // });
  }
}