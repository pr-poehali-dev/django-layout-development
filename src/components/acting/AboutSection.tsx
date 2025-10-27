import Icon from '@/components/ui/icon';
import { TeamMember } from '@/lib/api';

interface AboutSectionProps {
  content: Record<string, string>;
  team: TeamMember[];
}

export default function AboutSection({ content, team }: AboutSectionProps) {
  const kazbek = team.find(member => member.id === 1) || team[0];
  
  if (!kazbek) {
    return null;
  }

  return (
    <section id="about" className="py-12 px-4 md:py-20 md:px-4 bg-card">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center max-w-5xl mx-auto">
          <div className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
            {kazbek.photo_url ? (
              <img
                src={kazbek.photo_url}
                alt={kazbek.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center">
                <Icon name="User" className="text-primary/30" size={120} />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">{kazbek.name}</h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 md:mb-6 whitespace-pre-line">
              {kazbek.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}