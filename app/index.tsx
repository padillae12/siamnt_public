import { loginAsRole } from '@/lib/api-backend';
import { mockStore } from '@/lib/mock-data';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoleSelector() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1080;
  const isTablet = width >= 768 && width < 1080;

  const [loadingRole, setLoadingRole] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const handleSelectRole = async (role: 'admin' | 'empleado' | 'cliente', targetRoute: string) => {
    try {
      setLoadingRole(role);
      await loginAsRole(role);
      router.replace(targetRoute as any);
    } catch (error) {
      console.error('Error al ingresar con rol:', error);
      Alert.alert('Error', 'No se pudo iniciar la sesión demo.');
    } finally {
      setLoadingRole(null);
    }
  };

  const handleResetData = () => {
    mockStore.reset();
    setResetMessage('✓ Datos restablecidos al estado inicial');
    setTimeout(() => setResetMessage(null), 3000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a0f1d' }}>
      {/* Fondo con atmósfera y retícula de 64px exacta de Figma */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#0a0f1d',
        }}
      >
        {/* Resplandor ambiental radial de Figma */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 720,
            backgroundColor: 'transparent',
            // @ts-ignore
            backgroundImage:
              'radial-gradient(50% 70% at 50% 20%, rgba(8, 127, 173, 0.12) 0%, rgba(10, 15, 29, 0) 100%)',
          }}
        />

        {/* Retícula visual tenue de 64px en web */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.8,
            // @ts-ignore
            backgroundImage:
              'linear-gradient(to right, rgba(158, 189, 218, 0.031) 1px, transparent 1px), linear-gradient(to bottom, rgba(158, 189, 218, 0.031) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. CABECERA DEL PORTAL (Exacto: Alto 80px, Padding horizontal 48px) */}
        <View
          style={{
            width: '100%',
            height: 80,
            paddingHorizontal: isDesktop ? 48 : 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(255, 255, 255, 0.04)',
            zIndex: 10,
          }}
        >
          {/* Identidad del portal (Width 280px, Gap 12px) */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: 'rgba(34, 211, 238, 0.12)',
                borderWidth: 1,
                borderColor: 'rgba(34, 211, 238, 0.4)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="hardware-chip-outline" size={18} color="#22d3ee" />
            </View>
            <Text style={{ color: '#ffffff', fontWeight: '800', fontSize: 16, letterSpacing: 0.5 }}>
              ProMant
            </Text>
            <Text style={{ color: 'rgba(255, 255, 255, 0.2)', fontSize: 14 }}>/</Text>
            <Text style={{ color: '#94a3b8', fontSize: 13, fontWeight: '500' }}>
              Portal de demostración
            </Text>
          </View>

          {/* Categoría de producto (Gap 8px) */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: '#38bdf8',
                shadowColor: '#38bdf8',
                shadowRadius: 6,
                shadowOpacity: 0.9,
              }}
            />
            <Text
              style={{
                color: '#64748b',
                fontSize: 11,
                fontWeight: '700',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
              }}
            >
              Mantenimiento Industrial • HVAC
            </Text>
          </View>
        </View>

        {/* 2. CONTENIDO DEL PORTAL (Exacto: Width 1152px, Padding vertical 40px, Gap 40px) */}
        <View
          style={{
            width: '100%',
            maxWidth: 1152,
            paddingVertical: 40,
            paddingHorizontal: isDesktop ? 0 : 20,
            gap: 40,
            alignItems: 'center',
          }}
        >
          {/* A. PRESENTACIÓN (Hero - Gap 24px) */}
          <View style={{ alignItems: 'center', gap: 16, maxWidth: 640 }}>
            {/* Isotipo con resplandor */}
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                backgroundColor: 'rgba(34, 211, 238, 0.08)',
                borderWidth: 1.5,
                borderColor: '#22d3ee',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#22d3ee',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.35,
                shadowRadius: 18,
              }}
            >
              <Ionicons name="hardware-chip-outline" size={36} color="#22d3ee" />
            </View>

            <View style={{ alignItems: 'center', gap: 6 }}>
              <Text
                style={{
                  fontSize: isDesktop ? 36 : 28,
                  fontWeight: '900',
                  color: '#ffffff',
                  letterSpacing: 0.5,
                  textAlign: 'center',
                }}
              >
                ProMant
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: '#38bdf8',
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                Gestión Integral de Mantenimiento y Servicios
              </Text>
            </View>

            {/* Pill Badge */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(34, 211, 238, 0.08)',
                borderWidth: 1,
                borderColor: 'rgba(34, 211, 238, 0.3)',
                paddingHorizontal: 12,
                paddingVertical: 5,
                borderRadius: 20,
              }}
            >
              <Ionicons name="sparkles" size={13} color="#22d3ee" style={{ marginRight: 6 }} />
              <Text
                style={{
                  color: '#22d3ee',
                  fontSize: 11,
                  fontWeight: '800',
                  letterSpacing: 0.8,
                }}
              >
                MODO DEMO PÚBLICA (EN MEMORIA)
              </Text>
            </View>

            <Text
              style={{
                color: '#94a3b8',
                fontSize: 13.5,
                textAlign: 'center',
                lineHeight: 20,
              }}
            >
              Explora la plataforma sin contraseña. Elige un rol para probar sus herramientas.
            </Text>

            {resetMessage && (
              <View
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  borderColor: '#10b981',
                  borderWidth: 1,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: '#6ee7b7', fontWeight: '600', fontSize: 13 }}>
                  {resetMessage}
                </Text>
              </View>
            )}
          </View>

          {/* B. SELECCIÓN DE ACCESO (Exacto: Width 1152px, Gap 24px) */}
          <View style={{ width: '100%', gap: 16 }}>
            {/* Header de sección */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#e2e8f0', fontSize: 13, fontWeight: '700', letterSpacing: 0.5 }}>
                Elige tu experiencia
              </Text>
              <Text style={{ color: '#64748b', fontSize: 12, fontWeight: '500' }}>
                3 roles • Acceso inmediato
              </Text>
            </View>

            {/* Grid de 3 Cards (Ancho de card 368px aprox en desktop) */}
            <View
              style={{
                width: '100%',
                flexDirection: isDesktop ? 'row' : 'column',
                gap: 24,
                justifyContent: 'space-between',
              }}
            >
              {/* ================= CARD 1: ADMINISTRADOR ================= */}
              <View
                style={{
                  flex: isDesktop ? 1 : undefined,
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: 16,
                  padding: 24,
                  gap: 20,
                  overflow: 'hidden',
                  position: 'relative',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.4,
                  shadowRadius: 14,
                }}
              >
                {/* Acento de rol de Figma (Width 64px, Height 2px, Top 0, Left 24px) */}
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 24,
                    width: 64,
                    height: 2,
                    backgroundColor: '#38BDF8',
                    opacity: 0.9,
                  }}
                />

                {/* Identificador de rol (Height 48px) */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 48,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: 'rgba(14, 165, 233, 0.12)',
                      borderWidth: 1,
                      borderColor: 'rgba(56, 189, 248, 0.3)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ionicons name="shield-checkmark" size={22} color="#38bdf8" />
                  </View>

                  <View
                    style={{
                      backgroundColor: 'rgba(14, 165, 233, 0.15)',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 6,
                      borderWidth: 1,
                      borderColor: 'rgba(56, 189, 248, 0.3)',
                    }}
                  >
                    <Text style={{ color: '#38bdf8', fontSize: 10, fontWeight: '800', letterSpacing: 0.6 }}>
                      ROL: ADMIN
                    </Text>
                  </View>
                </View>

                {/* Perfil de demostración */}
                <View style={{ gap: 6 }}>
                  <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '800' }}>
                    Administrador
                  </Text>
                  <Text style={{ color: '#94a3b8', fontSize: 12, fontWeight: '600' }}>
                    Ing. Roberto Sánchez
                  </Text>
                  <Text style={{ color: '#64748b', fontSize: 11 }}>
                    admin@promant.com
                  </Text>

                  <Text style={{ color: '#cbd5e1', fontSize: 12.5, lineHeight: 18, marginTop: 8 }}>
                    Centraliza la operación y toma decisiones con reportes y métricas en tiempo real.
                  </Text>
                </View>

                {/* Herramientas incluidas (Gap 8px) */}
                <View style={{ gap: 8 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Ionicons name="checkmark" size={15} color="#38bdf8" />
                    <Text style={{ color: '#94a3b8', fontSize: 12 }}>Control de reportes y métricas</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Ionicons name="checkmark" size={15} color="#38bdf8" />
                    <Text style={{ color: '#94a3b8', fontSize: 12 }}>Gestión de equipos y servicios</Text>
                  </View>
                </View>

                {/* Botón CTA (Exacto: Height 48px, Background #0284C7, Border 1px rgba(56,189,248,0.33), Radius 8px) */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  disabled={loadingRole !== null}
                  onPress={() => handleSelectRole('admin', '/admin')}
                  style={{
                    height: 48,
                    backgroundColor: loadingRole === 'admin' ? '#475569' : '#0284C7',
                    borderWidth: 1,
                    borderColor: 'rgba(56, 189, 248, 0.33)',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 6,
                  }}
                >
                  <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 14 }}>
                    {loadingRole === 'admin' ? 'Entrando...' : 'Ingresar como Administrador →'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* ================= CARD 2: TÉCNICO ================= */}
              <View
                style={{
                  flex: isDesktop ? 1 : undefined,
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: 16,
                  padding: 24,
                  gap: 20,
                  overflow: 'hidden',
                  position: 'relative',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.4,
                  shadowRadius: 14,
                }}
              >
                {/* Acento de rol ámbar */}
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 24,
                    width: 64,
                    height: 2,
                    backgroundColor: '#F59E0B',
                    opacity: 0.9,
                  }}
                />

                {/* Identificador de rol */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 48,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: 'rgba(245, 158, 11, 0.12)',
                      borderWidth: 1,
                      borderColor: 'rgba(245, 158, 11, 0.3)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ionicons name="construct" size={22} color="#fbbf24" />
                  </View>

                  <View
                    style={{
                      backgroundColor: 'rgba(245, 158, 11, 0.15)',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 6,
                      borderWidth: 1,
                      borderColor: 'rgba(245, 158, 11, 0.3)',
                    }}
                  >
                    <Text style={{ color: '#fbbf24', fontSize: 10, fontWeight: '800', letterSpacing: 0.6 }}>
                      ROL: TÉCNICO
                    </Text>
                  </View>
                </View>

                {/* Perfil de demostración */}
                <View style={{ gap: 6 }}>
                  <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '800' }}>
                    Técnico
                  </Text>
                  <Text style={{ color: '#94a3b8', fontSize: 12, fontWeight: '600' }}>
                    Carlos Mendoza
                  </Text>
                  <Text style={{ color: '#64748b', fontSize: 11 }}>
                    carlos.mendoza@promant.com
                  </Text>

                  <Text style={{ color: '#cbd5e1', fontSize: 12.5, lineHeight: 18, marginTop: 8 }}>
                    Lleva el control de tus servicios con bitácoras de campo y cotizaciones en sitio.
                  </Text>
                </View>

                {/* Herramientas incluidas */}
                <View style={{ gap: 8 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Ionicons name="checkmark" size={15} color="#fbbf24" />
                    <Text style={{ color: '#94a3b8', fontSize: 12 }}>Bitácoras y evidencias de campo</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Ionicons name="checkmark" size={15} color="#fbbf24" />
                    <Text style={{ color: '#94a3b8', fontSize: 12 }}>Elaboración de cotizaciones</Text>
                  </View>
                </View>

                {/* Botón CTA */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  disabled={loadingRole !== null}
                  onPress={() => handleSelectRole('empleado', '/empleado-panel')}
                  style={{
                    height: 48,
                    backgroundColor: loadingRole === 'empleado' ? '#475569' : '#D97706',
                    borderWidth: 1,
                    borderColor: 'rgba(245, 158, 11, 0.33)',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 6,
                  }}
                >
                  <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 14 }}>
                    {loadingRole === 'empleado' ? 'Entrando...' : 'Ingresar como Técnico →'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* ================= CARD 3: CLIENTE ================= */}
              <View
                style={{
                  flex: isDesktop ? 1 : undefined,
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: 16,
                  padding: 24,
                  gap: 20,
                  overflow: 'hidden',
                  position: 'relative',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.4,
                  shadowRadius: 14,
                }}
              >
                {/* Acento de rol esmeralda */}
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 24,
                    width: 64,
                    height: 2,
                    backgroundColor: '#10B981',
                    opacity: 0.9,
                  }}
                />

                {/* Identificador de rol */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 48,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: 'rgba(16, 185, 129, 0.12)',
                      borderWidth: 1,
                      borderColor: 'rgba(16, 185, 129, 0.3)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ionicons name="business" size={22} color="#34d399" />
                  </View>

                  <View
                    style={{
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 6,
                      borderWidth: 1,
                      borderColor: 'rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    <Text style={{ color: '#34d399', fontSize: 10, fontWeight: '800', letterSpacing: 0.6 }}>
                      ROL: CLIENTE
                    </Text>
                  </View>
                </View>

                {/* Perfil de demostración */}
                <View style={{ gap: 6 }}>
                  <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '800' }}>
                    Cliente
                  </Text>
                  <Text style={{ color: '#94a3b8', fontSize: 12, fontWeight: '600' }}>
                    Mariana Treviño
                  </Text>
                  <Text style={{ color: '#64748b', fontSize: 11 }}>
                    OXXO
                  </Text>

                  <Text style={{ color: '#cbd5e1', fontSize: 12.5, lineHeight: 18, marginTop: 8 }}>
                    Reporta incidencias con fotos y da seguimiento a cada solicitud de mantenimiento.
                  </Text>
                </View>

                {/* Herramientas incluidas */}
                <View style={{ gap: 8 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Ionicons name="checkmark" size={15} color="#34d399" />
                    <Text style={{ color: '#94a3b8', fontSize: 12 }}>Tickets con evidencia fotográfica</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Ionicons name="checkmark" size={15} color="#34d399" />
                    <Text style={{ color: '#94a3b8', fontSize: 12 }}>Seguimiento de solicitudes</Text>
                  </View>
                </View>

                {/* Botón CTA */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  disabled={loadingRole !== null}
                  onPress={() => handleSelectRole('cliente', '/cliente-panel')}
                  style={{
                    height: 48,
                    backgroundColor: loadingRole === 'cliente' ? '#475569' : '#059669',
                    borderWidth: 1,
                    borderColor: 'rgba(16, 185, 129, 0.33)',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 6,
                  }}
                >
                  <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 14 }}>
                    {loadingRole === 'cliente' ? 'Entrando...' : 'Ingresar como Cliente →'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* C. HERRAMIENTAS DE LA DEMO (Footer - Gap 24px) */}
          <View style={{ alignItems: 'center', gap: 14, marginTop: 8 }}>
            <TouchableOpacity
              onPress={handleResetData}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 8,
                backgroundColor: 'rgba(30, 41, 59, 0.45)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <Ionicons name="refresh" size={14} color="#94a3b8" style={{ marginRight: 8 }} />
              <Text style={{ color: '#cbd5e1', fontSize: 12.5, fontWeight: '600' }}>
                Restablecer datos de prueba
              </Text>
            </TouchableOpacity>

            <Text style={{ color: '#64748b', fontSize: 11 }}>
              v1.0 • ProMant Demo Environment
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
