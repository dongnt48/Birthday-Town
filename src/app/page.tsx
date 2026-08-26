import { defaultStoryData } from '@/data/story';
import { StoryDirector } from '@/components/story/StoryDirector';
import { AudioToggle } from '@/components/ui/AudioToggle';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-space-950 text-neutral-100 overflow-x-hidden">
      {/* Floating Audio Controller */}
      <AudioToggle />

      {/* Cinematic Story Director */}
      <StoryDirector story={defaultStoryData} />
    </main>
  );
}
