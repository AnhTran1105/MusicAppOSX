from django.shortcuts import render
from django.shortcuts import render, redirect
from .forms import RegistrationForm, LoginForm
from .models import Song, Playlist
from django.contrib.auth.decorators import login_required
from .forms import CommentForm
from .models import Comment
from django.db.models import Q

def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = RegistrationForm()
    return render(request, 'register.html', {'form': form})

def login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            return redirect('home')
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

def create_playlist(request):
    if request.method == 'POST':
        title = request.POST['title']
        songs = request.POST.getlist('songs')
        playlist = Playlist.objects.create(title=title, created_by=request.user)
        playlist.songs.set(songs)
        return redirect('playlist_detail', playlist_id=playlist.id)
    else:
        songs = Song.objects.filter(created_by=request.user)
        return render(request, 'create_playlist.html', {'songs': songs})

def playlist_detail(request, playlist_id):
    playlist = Playlist.objects.get(id=playlist_id)
    return render(request, 'playlist_detail.html', {'playlist': playlist})

def add_comment(request):
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.user = request.user
            comment.save()
            return render(request, 'backend/success.html') 
    else:
        form = CommentForm()
    return render(request, 'backend/add_comment.html', {'form': form})

