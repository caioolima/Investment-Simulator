import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/HomePage.module.css';
import featuresStyles from './styles/FeaturesSection.module.css';
import testimonialsStyles from './styles/TestimonialsSection.module.css';
import Footer from '../../components/Footer/footer';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/simulator');
  };

  return (
    <div>
      <div className={styles.container}>
        <section className={styles.heroSection}>
          <h1 className={styles.heroTitle}>Connecter Invest</h1>
          <p className={styles.heroSubtitle}>
            Simule seus investimentos e acompanhe o mercado financeiro em tempo real com uma interface moderna e fácil de usar.
          </p>
          <button className={styles.heroButton} onClick={handleGetStartedClick}>
            Simular
          </button>
        </section>

        <section className={featuresStyles.featuresSection}>
          <h2 className={featuresStyles.featuresTitle}>Funcionalidades Principais</h2>
          <div className={featuresStyles.featuresContainer}>
            <div className={featuresStyles.featureCard}>
              <h3 className={featuresStyles.featureCardTitle}>Simulações Realistas</h3>
              <p className={featuresStyles.featureCardDescription}>
                Realize simulações de investimentos com diferentes ativos e cenários financeiros.
              </p>
            </div>
            <div className={featuresStyles.featureCard}>
              <h3 className={featuresStyles.featureCardTitle}>Gráficos Interativos</h3>
              <p className={featuresStyles.featureCardDescription}>
                Acompanhe seus investimentos com gráficos interativos e atualizações em tempo real.
              </p>
            </div>
            <div className={featuresStyles.featureCard}>
              <h3 className={featuresStyles.featureCardTitle}>Comparações de Cenários</h3>
              <p className={featuresStyles.featureCardDescription}>
                Compare diferentes cenários e obtenha análises detalhadas para decisões mais informadas.
              </p>
            </div>
            <div className={featuresStyles.featureCard}>
              <h3 className={featuresStyles.featureCardTitle}>Personalização Completa</h3>
              <p className={featuresStyles.featureCardDescription}>
                Personalize seu portfólio de investimentos conforme suas necessidades e objetivos.
              </p>
            </div>
          </div>
        </section>

        <section className={testimonialsStyles.testimonialsSection}>
          <h2 className={testimonialsStyles.testimonialsTitle}>Depoimentos de Usuários</h2>
          <blockquote className={testimonialsStyles.testimonial}>
            "A interface é extremamente intuitiva e os recursos de simulação são precisos. Me ajudou muito a tomar decisões melhores!"
          </blockquote>
          <cite className={testimonialsStyles.cite}>— João Silva</cite>

          <blockquote className={testimonialsStyles.testimonial}>
            "Melhor simulador que já usei. Design incrível e funcionalidades completas. Recomendo para todos!"
          </blockquote>
          <cite className={testimonialsStyles.cite}>— Maria Oliveira</cite>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
