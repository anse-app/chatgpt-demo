.slide-top-enter-active, .slide-top-exit-active,
.slide-bottom-enter-active, .slide-bottom-exit-active,
.slide-left-enter-active, .slide-left-exit-active,
.slide-right-enter-active, .slide-right-exit-active {
  transition: opacity 0.3s, transform 0.36s;
}

.slide-top-enter, .slide-top-exit-to {
  @apply -translate-y-20 opacity-0 sm:translate-y-2;
}
.slide-top-enter-to {
  @apply translate-y-0;
}

.slide-bottom-enter, .slide-bottom-exit-to {
  @apply translate-y-20 opacity-0 sm:translate-y-2;
}
.slide-bottom-enter-to {
  @apply translate-y-0;
}

.slide-left-enter, .slide-left-exit-to {
  @apply -translate-x-full opacity-0;
}
.slide-left-enter-to {
  @apply translate-x-0;
}

.slide-right-enter, .slide-right-exit-to {
  @apply translate-x-full opacity-0;
}
.slide-right-enter-to {
  @apply translate-x-0;
}

.loading-anim::before {
  content: ' ';
  background-image: linear-gradient(90deg, #ffffff00 0%, var(--c-shadow) 35%, var(--c-shadow) 65%, #ffffff00 100%);
  position: absolute;
  top: 0;
  bottom: 0;
  /* height: 1px; */
  width: 60%;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-name: progress-bar-loop;
}

@keyframes progress-bar-loop {
  from {
    left: -60%;
  }
  to {
    left: 110%;
  }
}