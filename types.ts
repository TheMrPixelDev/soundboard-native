import { Audio, AVPlaybackSource } from "expo-av";

export type Color = "green" | "red" | "blue" | "yellow";

export interface Sound {
  sound: string;
  text: string;
  color: Color;
}

export interface CategoriesWithSounds {
  [category: string]: Sound[];
}

export interface CategoriesWithSoundsData {
  [category: string]: SoundData[];
}

export interface SoundData {
  sound: AVPlaybackSource;
  text: string;
  color: Color;
}

export type SoundDataAndPlayback = {
  sound: SoundData;
  playback: Audio.Sound;
};

export type PlaybackStatus = "PLAYING" | "PAUSED" | "NONE";
