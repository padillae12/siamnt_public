import { loginAsRole } from '@/lib/api-backend';
import { mockStore } from '@/lib/mock-data';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
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
  const isMobile = width < 768;
  const isSmallScreen = width < 420;

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <LinearGradient
        colors={['#0f172a', '#0b1b3d', '#0f172a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: isSmallScreen ? 14 : 24,
            paddingVertical: 32,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header con Icono/Logo Genérico */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <View
              style={{
                width: isSmallScreen ? 76 : 96,
                height: isSmallScreen ? 76 : 96,
                borderRadius: 24,
                backgroundColor: 'rgba(34, 211, 238, 0.1)',
                borderWidth: 2,
                borderColor: '#22d3ee',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                shadowColor: '#22d3ee',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.35,
                shadowRadius: 14,
              }}
            >
              <Ionicons name="hardware-chip-outline" size={isSmallScreen ? 42 : 54} color="#22d3ee" />
            </View>
            <Text
              style={{
                fontSize: isSmallScreen ? 26 : 32,
                fontWeight: '900',
                color: '#ffffff',
                letterSpacing: 2,
              }}
            >
              ProMant
            </Text>
            <Text
              style={{
                fontSize: isSmallScreen ? 13 : 15,
                color: '#38bdf8',
                fontWeight: '600',
                marginTop: 2,
              }}
            >
              Gestión Integral de Mantenimiento y Servicios
            </Text>

            {/* Badge Demostración Pública */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(34, 211, 238, 0.12)',
                borderColor: 'rgba(34, 211, 238, 0.4)',
                borderWidth: 1,
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 20,
                marginTop: 14,
              }}
            >
              <Ionicons name="sparkles" size={15} color="#22d3ee" style={{ marginRight: 6 }} />
              <Text
                style={{
                  color: '#22d3ee',
                  fontSize: 12,
                  fontWeight: '700',
                  letterSpacing: 0.5,
                }}
              >
                MODO DEMOSTRACIÓN PÚBLICA (EN MEMORIA)
              </Text>
            </View>

            <Text
              style={{
                color: '#94a3b8',
                fontSize: 13,
                textAlign: 'center',
                maxWidth: 580,
                marginTop: 10,
                lineHeight: 18,
              }}
            >
              Selecciona el rol con el que deseas probar la plataforma. No se requiere contraseña.
              Los datos se guardan en caché durante la sesión y se restablecen al reiniciar la página.
            </Text>
          </View>

          {/* Toast / Alerta de reinicio */}
          {resetMessage && (
            <View
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                borderColor: '#10b981',
                borderWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              <Text style={{ color: '#6ee7b7', fontWeight: '600', fontSize: 13 }}>
                {resetMessage}
              </Text>
            </View>
          )}

          {/* Contenedor de Tarjetas de Roles */}
          <View
            style={{
              width: '100%',
              maxWidth: 720,
              gap: 16,
            }}
          >
            {/* ROL 1: ADMINISTRADOR */}
            <TouchableOpacity
              activeOpacity={0.85}
              disabled={loadingRole !== null}
              onPress={() => handleSelectRole('admin', '/admin')}
              style={{
                backgroundColor: 'rgba(30, 41, 59, 0.85)',
                borderWidth: 1,
                borderColor: 'rgba(56, 189, 248, 0.35)',
                borderRadius: 16,
                padding: isSmallScreen ? 16 : 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 8,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 }}>
                  <View
                    style={{
                      width: isSmallScreen ? 44 : 52,
                      height: isSmallScreen ? 44 : 52,
                      borderRadius: 14,
                      backgroundColor: 'rgba(14, 165, 233, 0.2)',
                      borderWidth: 1,
                      borderColor: '#0284c7',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 14,
                    }}
                  >
                    <Ionicons name="shield-checkmark" size={isSmallScreen ? 24 : 28} color="#38bdf8" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <Text style={{ color: '#ffffff', fontSize: isSmallScreen ? 16 : 18, fontWeight: '700' }}>
                        Panel Administrador
                      </Text>
                      <View
                        style={{
                          backgroundColor: '#0369a1',
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          borderRadius: 6,
                        }}
                      >
                        <Text style={{ color: '#e0f2fe', fontSize: 10, fontWeight: '800' }}>ROL: ADMIN</Text>
                      </View>
                    </View>
                    <Text style={{ color: '#94a3b8', fontSize: 12, marginTop: 3 }}>
                      Usuario demo: <Text style={{ color: '#38bdf8' }}>Ing. Roberto Sánchez</Text> (admin@ProMant.com)
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={22} color="#38bdf8" />
              </View>

              <Text style={{ color: '#cbd5e1', fontSize: 12, marginTop: 12, lineHeight: 17 }}>
                Supervisión global de operaciones: Historial de reportes, cotizaciones pendientes, validación de servicios técnicos, asignación de tareas, gestión de empresas y métricas en tiempo real.
              </Text>

              <View
                style={{
                  marginTop: 14,
                  backgroundColor: loadingRole === 'admin' ? '#475569' : '#0284c7',
                  paddingVertical: 10,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 14 }}>
                  {loadingRole === 'admin' ? 'Entrando...' : 'Ingresar como Administrador →'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* ROL 2: TÉCNICO / EMPLEADO */}
            <TouchableOpacity
              activeOpacity={0.85}
              disabled={loadingRole !== null}
              onPress={() => handleSelectRole('empleado', '/empleado-panel')}
              style={{
                backgroundColor: 'rgba(30, 41, 59, 0.85)',
                borderWidth: 1,
                borderColor: 'rgba(245, 158, 11, 0.35)',
                borderRadius: 16,
                padding: isSmallScreen ? 16 : 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 8,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 }}>
                  <View
                    style={{
                      width: isSmallScreen ? 44 : 52,
                      height: isSmallScreen ? 44 : 52,
                      borderRadius: 14,
                      backgroundColor: 'rgba(245, 158, 11, 0.2)',
                      borderWidth: 1,
                      borderColor: '#d97706',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 14,
                    }}
                  >
                    <Ionicons name="construct" size={isSmallScreen ? 24 : 28} color="#fbbf24" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <Text style={{ color: '#ffffff', fontSize: isSmallScreen ? 16 : 18, fontWeight: '700' }}>
                        Panel Técnico / Empleado
                      </Text>
                      <View
                        style={{
                          backgroundColor: '#b45309',
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          borderRadius: 6,
                        }}
                      >
                        <Text style={{ color: '#fef3c7', fontSize: 10, fontWeight: '800' }}>ROL: EMPLEADO</Text>
                      </View>
                    </View>
                    <Text style={{ color: '#94a3b8', fontSize: 12, marginTop: 3 }}>
                      Usuario demo: <Text style={{ color: '#fbbf24' }}>Carlos Mendoza</Text> (carlos.mendoza@ProMant.com)
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={22} color="#fbbf24" />
              </View>

              <Text style={{ color: '#cbd5e1', fontSize: 12, marginTop: 12, lineHeight: 17 }}>
                Operación técnica de campo: Reportes asignados, llenado de bitácora técnica (revisión, refacciones, mano de obra), cotizaciones en sitio, evidencias multimedia y herramientas a cargo.
              </Text>

              <View
                style={{
                  marginTop: 14,
                  backgroundColor: loadingRole === 'empleado' ? '#475569' : '#d97706',
                  paddingVertical: 10,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 14 }}>
                  {loadingRole === 'empleado' ? 'Entrando...' : 'Ingresar como Técnico →'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* ROL 3: CLIENTE */}
            <TouchableOpacity
              activeOpacity={0.85}
              disabled={loadingRole !== null}
              onPress={() => handleSelectRole('cliente', '/cliente-panel')}
              style={{
                backgroundColor: 'rgba(30, 41, 59, 0.85)',
                borderWidth: 1,
                borderColor: 'rgba(16, 185, 129, 0.35)',
                borderRadius: 16,
                padding: isSmallScreen ? 16 : 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 8,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 }}>
                  <View
                    style={{
                      width: isSmallScreen ? 44 : 52,
                      height: isSmallScreen ? 44 : 52,
                      borderRadius: 14,
                      backgroundColor: 'rgba(16, 185, 129, 0.2)',
                      borderWidth: 1,
                      borderColor: '#059669',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 14,
                    }}
                  >
                    <Ionicons name="business" size={isSmallScreen ? 24 : 28} color="#34d399" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <Text style={{ color: '#ffffff', fontSize: isSmallScreen ? 16 : 18, fontWeight: '700' }}>
                        Panel Cliente
                      </Text>
                      <View
                        style={{
                          backgroundColor: '#047857',
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          borderRadius: 6,
                        }}
                      >
                        <Text style={{ color: '#d1fae5', fontSize: 10, fontWeight: '800' }}>ROL: CLIENTE</Text>
                      </View>
                    </View>
                    <Text style={{ color: '#94a3b8', fontSize: 12, marginTop: 3 }}>
                      Usuario demo: <Text style={{ color: '#34d399' }}>Mariana Treviño</Text> (Cadena Comercial OXXO)
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={22} color="#34d399" />
              </View>

              <Text style={{ color: '#cbd5e1', fontSize: 12, marginTop: 12, lineHeight: 17 }}>
                Portal de atención para empresas: Creación de reportes con fotos por sucursal y equipo, seguimiento de estatus en tiempo real, revisión de presupuestos y calificación de satisfacción.
              </Text>

              <View
                style={{
                  marginTop: 14,
                  backgroundColor: loadingRole === 'cliente' ? '#475569' : '#059669',
                  paddingVertical: 10,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 14 }}>
                  {loadingRole === 'cliente' ? 'Entrando...' : 'Ingresar como Cliente →'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Botón para reiniciar datos de demo */}
          <View style={{ marginTop: 28, alignItems: 'center' }}>
            <TouchableOpacity
              onPress={handleResetData}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 8,
                backgroundColor: 'rgba(51, 65, 85, 0.6)',
                borderWidth: 1,
                borderColor: '#475569',
              }}
            >
              <Ionicons name="refresh" size={16} color="#94a3b8" style={{ marginRight: 8 }} />
              <Text style={{ color: '#cbd5e1', fontSize: 13, fontWeight: '600' }}>
                Restablecer datos de prueba a estado inicial
              </Text>
            </TouchableOpacity>
            <Text style={{ color: '#64748b', fontSize: 11, marginTop: 8 }}>
              v1.0.0 • Versión Demo Pública • Ejecución en Caché
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
