import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PhoneForm from '@/components/PhoneForm';
import { api, TeamMember } from '@/lib/api';

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const data = await api.gallery.getTeam();
      setTeam(data);
    } catch (error) {
      console.error('Error loading team:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="pt-32 pb-20 px-6 md:px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Наша <span className="text-primary">команда</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Профессионалы своего дела, которые помогут вам раскрыть потенциал
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <Icon name="Loader2" className="animate-spin mx-auto text-primary" size={48} />
            </div>
          ) : team.length === 0 ? (
            <div className="text-center py-20">
              <Icon name="Users" className="mx-auto mb-4 text-muted-foreground" size={64} />
              <p className="text-xl text-muted-foreground">
                Скоро здесь появится информация о нашей команде!
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {team.map((member) => (
                  <Card key={member.id} className="group hover:shadow-xl transition-all duration-300">
                    <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                      {member.photo_url ? (
                        <img 
                          src={member.photo_url} 
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <Icon name="User" className="text-primary/30" size={80} />
                        </div>
                      )}
                    </div>
                    <CardContent className="pt-6">
                      <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                      <p className="text-primary font-semibold mb-4">{member.role}</p>
                      {member.bio && (
                        <p className="text-muted-foreground leading-relaxed">
                          {member.bio}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-card p-12 rounded-3xl max-w-2xl mx-auto text-center">
                <Icon name="GraduationCap" size={48} className="mx-auto mb-4 text-primary" />
                <h2 className="text-3xl font-bold mb-4">Учитесь у лучших</h2>
                <p className="text-muted-foreground mb-6">
                  Запишитесь на курс и работайте с профессионалами
                </p>
                <PhoneForm 
                  source="team_cta"
                  triggerText="Записаться на курс"
                  triggerClassName="w-full sm:w-auto"
                />
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
