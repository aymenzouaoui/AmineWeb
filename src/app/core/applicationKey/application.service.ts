import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private baseUrl = "http://localhost:9090/";

  constructor(private httpClient: HttpClient, private userService: UserService) { }
  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
}
  private getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('accessToken') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
  }

  // Fetch all applications
  getAllApplications(): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.get<any>(this.baseUrl + 'applications/super', { headers });
  }

  // Create a new application
  createApplication(applicationData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.post<any>(this.baseUrl + 'applications', applicationData, { headers });
  }

  // Update an existing application
  updateApplication(applicationId: string, applicationData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.put<any>(this.baseUrl + 'applications/' + applicationId, applicationData, { headers });
  }

  // Delete an application
  deleteApplication(applicationId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.delete<any>(this.baseUrl + 'applications/' + applicationId, { headers });
  }

  // Get applications associated with a user
  getApplicationsByUserId(): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.get<any>(this.baseUrl + 'applications/', { headers });
  }


  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ilhoqrza');
    const cloudName = 'dznvwntjn';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    return this.httpClient.post(url, formData);
  }
}
