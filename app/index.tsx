import { loginAsRole } from '@/lib/api-backend';
import { mockStore } from '@/lib/mock-data';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Platform,
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
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;
  const isMobile = width < 768;

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#060b16' }}>
      <LinearGradient
        colors={['#060b16', '#091326', '#060b16']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: isDesktop ? 48 : isTablet ? 32 : 16,
            paddingVertical: 24,
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Bar Minimalista (como en Figma) */}
          <View
            style={{
              width: '100%',
              maxWidth: 1160,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: 24,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(255, 255, 255, 0.05)',
              marginBottom: 36,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  backgroundColor: 'rgba(34, 211, 238, 0.15)',
                  borderWidth: 1,
                  borderColor: 'rgba(34, 211, 238, 0.5)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="hardware-chip-outline" size={16} color="#22d3ee" />
              </View>
              <Text style={{ color: '#ffffff', fontWeight: '800', fontSize: 15, letterSpacing: 0.5 }}>
                ProMant
              </Text>
              <Text style={{ color: '#475569', fontSize: 13 }}>/</Text>
              <Text style={{ color: '#94a3b8', fontSize: 13, fontWeight: '500' }}>
                Portal de demostración
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 4,
                  backgroundColor: '#22d3ee',
                  shadowColor: '#22d3ee',
                  shadowRadius: 6,
                  shadowOpacity: 0.8,
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

          {/* Hero Section */}
          <View style={{ alignItems: 'center', marginBottom: 40, maxWidth: 640 }}>
            <View
              style={{
                width: 68,
                height: 68,
                borderRadius: 18,
                backgroundColor: 'rgba(34, 211, 238, 0.1)',
                borderWidth: 1.5,
                borderColor: '#22d3ee',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 18,
                shadowColor: '#22d3ee',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.35,
                shadowRadius: 16,
              }}
            >
              <Ionicons name="hardware-chip-outline" size={38} color="#22d3ee" />
            </View>

            <Text
              style={{
                fontSize: isDesktop ? 38 : 30,
                fontWeight: '900',
                color: '#ffffff',
                letterSpacing: 0.8,
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
                marginTop: 6,
                textAlign: 'center',
              }}
            >
              Gestión Integral de Mantenimiento y Servicios
            </Text>

            {/* Pill Badge */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(34, 211, 238, 0.08)',
                borderWidth: 1,
                borderColor: 'rgba(34, 211, 238, 0.35)',
                paddingHorizontal: 12,
                paddingVertical: 5,
                borderRadius: 20,
                marginTop: 14,
                marginBottom: 12,
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
                fontSize: 13,
                textAlign: 'center',
                lineHeight: 19,
                marginTop: 4,
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
                  marginTop: 14,
                }}
              >
                <Text style={{ color: '#6ee7b7', fontWeight: '600', fontSize: 13 }}>
                  {resetMessage}
                </Text>
              </View>
            )}
          </View>

          {/* Section Sub-header */}
          <View
            style={{
              width: '100%',
              maxWidth: 1160,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Text style={{ color: '#e2e8f0', fontSize: 13, fontWeight: '700', letterSpacing: 0.4 }}>
              Elige tu experiencia
            </Text>
            <Text style={{ color: '#64748b', fontSize: 12, fontWeight: '500' }}>
              3 roles • Acceso inmediato
            </Text>
          </View>

          {/* 3 CARDS DE ROL (Grid de 3 columnas en Desktop, Columna en Mobile) */}
          <View
            style={{
              width: '100%',
              maxWidth: 1160,
              flexDirection: isDesktop ? 'row' : 'column',
              gap: 20,
              justifyContent: 'space-between',
            }}
          >
            {/* 1. ADMINISTRADOR */}
            <View
              style={{
                flex: isDesktop ? 1 : undefined,
                backgroundColor: 'rgba(15, 23, 42, 0.75)',
                borderWidth: 1,
                borderColor: 'rgba(56, 189, 248, 0.25)',
                borderRadius: 18,
                padding: 24,
                justifyContent: 'space-between',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.35,
                shadowRadius: 12,
              }}
            >
              <View>
                {/* Header card: Icono + Badge */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: 'rgba(14, 165, 233, 0.15)',
                      borderWidth: 1,
                      borderColor: 'rgba(56, 189, 248, 0.4)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ionicons name="shield-checkmark" size={22} color="#38bdf8" />
                  </View>

                  <View
                    style={{
                      backgroundColor: 'rgba(14, 165, 233, 0.18)',
                      paddingHorizontal: 9,
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

                {/* Título & Usuario Demo */}
                <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '800', marginBottom: 4 }}>
                  Administrador
                </Text>
                <Text style={{ color: '#94a3b8', fontSize: 12, fontWeight: '600' }}>
                  Ing. Roberto Sánchez
                </Text>
                <Text style={{ color: '#64748b', fontSize: 11, marginBottom: 14 }}>
                  admin@promant.com
                </Text>

                <Text style={{ color: '#cbd5e1', fontSize: 12.5, lineHeight: 18, marginBottom: 18 }}>
                  Centraliza la operación y toma decisiones con reportes y métricas en tiempo real.
                </Text>

                {/* Features con checks */}
                <View style={{ gap: 8, marginBottom: 24 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Ionicons name="checkmark" size={15} color="#38bdf8" />
                    <Text style={{ color: '#94a3b8', fontSize: 12 }}>Control de reportes y métricas</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Ionicons name="checkmark" size={15} color="#38bdf8" />
                    <Text style={{ color: '#94a3b8', fontSize: 12 }}>Gestión de equipos y servicios</Text>
                  </View>
                </View>
              </View>

              {/* Botón CTA */}
              <TouchableOpacity
                activeOpacity={0.85}
                disabled={loadingRole !== null}
                onPress={() => handleSelectRole('admin', '/admin')}
                style={{
                  backgroundColor: loadingRole === 'admin' ? '#475569' : '#0284c7',
                  paddingVertical: 12,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 13.5 }}>
                  {loadingRole === 'admin' ? 'Entrando...' : 'Ingresar como Administrador →'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* 2. TÉCNICO */}
            <View
              style={{
                flex: isDesktop ? 1 : undefined,
                backgroundColor: 'rgba(15, 23, 42, 0.75)',
                borderWidth: 1,
                borderColor: 'rgba(245, 158, 11, 0.25)',
                borderRadius: 18,
                padding: 24,
                justifyContent: 'space-between',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.35,
                shadowRadius: 12,
              }}
            >
              <View>
                {/* Header card */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: 'rgba(245, 158, 11, 0.15)',
                      borderWidth: 1,
                      borderColor: 'rgba(245, 158, 11, 0.4)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ionicons name="construct" size={22} color="#fbbf24" />
                  </View>

                  <View
                    style={{
                      backgroundColor: 'rgba(245, 158, 11, 0.18)',
                      paddingHorizontal: 9,
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

                {/* Título & Usuario Demo */}
                <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '800', marginBottom: 4 }}>
                  Técnico
                </Text>
                <Text style={{ color: '#94a3b8', fontSize: 12, fontWeight: '600' }}>
                  Carlos Mendoza
                </Text>
                <Text style={{ color: '#64748b', fontSize: 11, marginBottom: 14 }}>
                  carlos.mendoza@promant.com
                </Text>

                <Text style={{ color: '#cbd5e1', fontSize: 12.5, lineHeight: 18, marginBottom: 18 }}>
                  Lleva el control de tus servicios con bitácoras de campo y cotizaciones en sitio.
                </Text>

                {/* Features con checks */}
                <View style={{ gap: 8, marginBottom: 24 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Ionicons name="checkmark" size={15} color="#fbbf24" />
                    <Text style={{ color: '#94a3b8', fontSize: 12 }}>Bitácoras y evidencias de campo</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Ionicons name="checkmark" size={15} color="#fbbf24" />
                    <Text style={{ color: '#94a3b8', fontSize: 12 }}>Elaboración de cotizaciones</Text>
                  </View>
                </View>
              </View>

              {/* Botón CTA */}
              <TouchableOpacity
                activeOpacity={0.85}
                disabled={loadingRole !== null}
                onPress={() => handleSelectRole('empleado', '/empleado-panel')}
                style={{
                  backgroundColor: loadingRole === 'empleado' ? '#475569' : '#d97706',
                  paddingVertical: 12,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 13.5 }}>
                  {loadingRole === 'empleado' ? 'Entrando...' : 'Ingresar como Técnico →'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* 3. CLIENTE */}
            <View
              style={{
                flex: isDesktop ? 1 : undefined,
                backgroundColor: 'rgba(15, 23, 42, 0.75)',
                borderWidth: 1,
                borderColor: 'rgba(16, 185, 129, 0.25)',
                borderRadius: 18,
                padding: 24,
                justifyContent: 'space-between',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.35,
                shadowRadius: 12,
              }}
            >
              <View>
                {/* Header card */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      borderWidth: 1,
                      borderColor: 'rgba(16, 185, 129, 0.4)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ionicons name="business" size={22} color="#34d399" />
                  </View>

                  <View
                    style={{
                      backgroundColor: 'rgba(16, 185, 129, 0.18)',
                      paddingHorizontal: 9,
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

                {/* Título & Usuario Demo */}
                <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '800', marginBottom: 4 }}>
                  Cliente
                </Text>
                <Text style={{ color: '#94a3b8', fontSize: 12, fontWeight: '600' }}>
                  Mariana Treviño
                </Text>
                <Text style={{ color: '#64748b', fontSize: 11, marginBottom: 14 }}>
                  OXXO
                </Text>

                <Text style={{ color: '#cbd5e1', fontSize: 12.5, lineHeight: 18, marginBottom: 18 }}>
                  Reporta incidencias con fotos y da seguimiento a cada solicitud de mantenimiento.
                </Text>

                {/* Features con checks */}
                <View style={{ gap: 8, marginBottom: 24 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Ionicons name="checkmark" size={15} color="#34d399" />
                    <Text style={{ color: '#94a3b8', fontSize: 12 }}>Tickets con evidencia fotográfica</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Ionicons name="checkmark" size={15} color="#34d399" />
                    <Text style={{ color: '#94a3b8', fontSize: 12 }}>Seguimiento de solicitudes</Text>
                  </View>
                </View>
              </View>

              {/* Botón CTA */}
              <TouchableOpacity
                activeOpacity={0.85}
                disabled={loadingRole !== null}
                onPress={() => handleSelectRole('cliente', '/cliente-panel')}
                style={{
                  backgroundColor: loadingRole === 'cliente' ? '#475569' : '#059669',
                  paddingVertical: 12,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 13.5 }}>
                  {loadingRole === 'cliente' ? 'Entrando...' : 'Ingresar como Cliente →'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer minimalista */}
          <View style={{ marginTop: 40, alignItems: 'center', gap: 10 }}>
            <TouchableOpacity
              onPress={handleResetData}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 9,
                borderRadius: 8,
                backgroundColor: 'rgba(30, 41, 59, 0.4)',
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
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
