import { loginAsRole } from '@/lib/api-backend';
import { mockStore } from '@/lib/mock-data';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoleSelector() {
  const router = useRouter();
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0F1D' }}>
      {/* Fondo con atmósfera y retícula de 64px de Figma */}
      <View
        // @ts-ignore
        className="promant-bg-grid"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#0A0F1D',
        }}
      >
        {/* Resplandor ambiental radial exacto de Figma */}
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
              'radial-gradient(50% 70% at 50% 20%, rgba(8, 127, 173, 0.086) 0%, rgba(10, 15, 29, 0) 100%)',
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
        {/* ========================================================
            1. CABECERA DEL PORTAL (Figma: Alto 80px, Padding 0 48px)
        ======================================================== */}
        <View
          style={{
            width: '100%',
            height: 80,
            paddingHorizontal: 48,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(255, 255, 255, 0.039)',
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
                backgroundColor: '#102838',
                borderWidth: 1,
                borderColor: 'rgba(34, 211, 238, 0.258)',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#22d3ee',
                shadowRadius: 16,
                shadowOpacity: 0.15,
              }}
            >
              <Ionicons name="hardware-chip-outline" size={16} color="#22D3EE" />
            </View>
            <Text style={{ color: '#F1F5F9', fontWeight: '800', fontSize: 16, letterSpacing: -0.2 }}>
              ProMant
            </Text>
            <Text style={{ color: 'rgba(255, 255, 255, 0.15)', fontSize: 14 }}>/</Text>
            <Text style={{ color: '#94A3B8', fontSize: 12, fontWeight: '400' }}>
              Portal de demostración
            </Text>
          </View>

          {/* Categoría de producto (Width 234px, Gap 8px) */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View
              style={{
                width: 5,
                height: 5,
                borderRadius: 2.5,
                backgroundColor: '#22D3EE',
              }}
            />
            <Text
              style={{
                color: '#94A3B8',
                fontSize: 10,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                fontWeight: '400',
              }}
            >
              Mantenimiento Industrial • HVAC
            </Text>
          </View>
        </View>

        {/* ========================================================
            2. CONTENIDO DEL PORTAL (Figma: Max-Width 1152px, Gap 40px)
        ======================================================== */}
        <View
          style={{
            width: '100%',
            maxWidth: 1152,
            paddingVertical: 40,
            paddingHorizontal: 24,
            gap: 40,
            alignItems: 'center',
          }}
        >
          {/* A. PRESENTACIÓN / HERO (Figma: Gap 24px) */}
          <View style={{ alignItems: 'center', gap: 20, maxWidth: 640 }}>
            {/* Identidad ProMant (Figma: 64x64, Background #102838, Border 1px rgba(34,211,238,0.258), Radius 16px) */}
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                backgroundColor: '#102838',
                borderWidth: 1,
                borderColor: 'rgba(34, 211, 238, 0.258)',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#22D3EE',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.14,
                shadowRadius: 32,
              }}
            >
              <Ionicons name="hardware-chip-outline" size={32} color="#22D3EE" />
            </View>

            {/* Marca & Propuesta */}
            <View style={{ alignItems: 'center', gap: 8 }}>
              <Text
                style={{
                  fontSize: 44,
                  fontWeight: '700',
                  color: '#F1F5F9',
                  letterSpacing: -1.8,
                  textAlign: 'center',
                }}
              >
                ProMant
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#BBC8D9',
                  textAlign: 'center',
                  fontWeight: '400',
                  lineHeight: 24,
                }}
              >
                Gestión Integral de Mantenimiento y Servicios
              </Text>
            </View>

            {/* Pill Badge (Figma: Indicador activo 6px + Modo de acceso) */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(34, 211, 238, 0.08)',
                borderWidth: 1,
                borderColor: 'rgba(34, 211, 238, 0.25)',
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 20,
                gap: 8,
              }}
            >
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#22D3EE',
                  shadowColor: '#22D3EE',
                  shadowRadius: 8,
                  shadowOpacity: 0.53,
                }}
              />
              <Text
                style={{
                  color: '#A5F3FC',
                  fontSize: 10,
                  fontWeight: '600',
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}
              >
                MODO DEMO PÚBLICA (EN MEMORIA)
              </Text>
            </View>

            {/* Instrucciones de acceso */}
            <Text
              style={{
                color: '#94A3B8',
                fontSize: 14,
                textAlign: 'center',
                lineHeight: 23,
              }}
            >
              Explora la plataforma sin contraseña. Elige un rol para probar sus herramientas.
            </Text>

            {resetMessage && (
              <View
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  borderColor: '#10B981',
                  borderWidth: 1,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: '#6EE7B7', fontWeight: '600', fontSize: 13 }}>
                  {resetMessage}
                </Text>
              </View>
            )}
          </View>

          {/* B. SELECCIÓN DE ACCESO (Figma: Gap 24px) */}
          <View style={{ width: '100%', gap: 16 }}>
            {/* Header de sección */}
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#CBD5E1', fontSize: 14, fontWeight: '500' }}>
                Elige tu experiencia
              </Text>
              <Text style={{ color: '#7F90A8', fontSize: 11, fontWeight: '400' }}>
                3 roles • Acceso inmediato
              </Text>
            </View>

            {/* CONTENEDOR GRID DE 3 TARJETAS (Horizontal en Desktop con .promant-cards-container) */}
            <View
              // @ts-ignore
              className="promant-cards-container"
              style={{
                width: '100%',
                flexDirection: 'row',
                gap: 24,
              }}
            >
              {/* ================= CARD 1: ADMINISTRADOR ================= */}
              <View
                // @ts-ignore
                className="promant-card-box"
                style={{
                  backgroundColor: 'rgba(16, 24, 40, 0.75)',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: 16,
                  padding: 24,
                  gap: 20,
                  position: 'relative',
                  overflow: 'hidden',
                  justifyContent: 'space-between',
                }}
              >
                {/* Acento de rol (Figma: 64x2px, top 0, left 24px, #38BDF8) */}
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 24,
                    width: 64,
                    height: 2,
                    backgroundColor: '#38BDF8',
                    opacity: 0.8,
                  }}
                />

                <View style={{ gap: 16 }}>
                  {/* Identificador de rol (Figma: Height 48px) */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: 48,
                    }}
                  >
                    {/* Emblema (Figma: 48x48, background rgba(2,132,199,0.1), border rgba(56,189,248,0.188), radius 12px) */}
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        backgroundColor: 'rgba(2, 132, 199, 0.102)',
                        borderWidth: 1,
                        borderColor: 'rgba(56, 189, 248, 0.188)',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Ionicons name="shield-checkmark" size={22} color="#38BDF8" />
                    </View>

                    {/* Tag Rol */}
                    <View
                      style={{
                        backgroundColor: 'rgba(2, 132, 199, 0.12)',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 6,
                        borderWidth: 1,
                        borderColor: 'rgba(56, 189, 248, 0.25)',
                      }}
                    >
                      <Text style={{ color: '#38BDF8', fontSize: 10, fontWeight: '600', letterSpacing: 0.8 }}>
                        ROL: ADMIN
                      </Text>
                    </View>
                  </View>

                  {/* Perfil de demostración */}
                  <View style={{ gap: 4 }}>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: '600',
                        color: '#F1F5F9',
                        letterSpacing: -0.6,
                      }}
                    >
                      Administrador
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#D5DFEB' }}>
                      Ing. Roberto Sánchez
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: '400', color: '#7F90A8' }}>
                      admin@promant.com
                    </Text>

                    {/* Resumen de permisos */}
                    <Text
                      style={{
                        fontSize: 13,
                        lineHeight: 21,
                        color: '#94A3B8',
                        marginTop: 10,
                      }}
                    >
                      Centraliza la operación y toma decisiones con reportes y métricas en tiempo real.
                    </Text>
                  </View>

                  {/* Herramientas incluidas (Gap 8px) */}
                  <View style={{ gap: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Ionicons name="checkmark" size={14} color="#38BDF8" />
                      <Text style={{ color: '#94A3B8', fontSize: 12 }}>Control de reportes y métricas</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Ionicons name="checkmark" size={14} color="#38BDF8" />
                      <Text style={{ color: '#94A3B8', fontSize: 12 }}>Gestión de equipos y servicios</Text>
                    </View>
                  </View>
                </View>

                {/* Botón CTA (Figma: Height 48px, Background #0284C7, Radius 8px) */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  disabled={loadingRole !== null}
                  onPress={() => handleSelectRole('admin', '/admin')}
                  style={{
                    height: 48,
                    backgroundColor: loadingRole === 'admin' ? '#475569' : '#0284C7',
                    borderWidth: 1,
                    borderColor: 'rgba(56, 189, 248, 0.333)',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 8,
                  }}
                >
                  <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 13 }}>
                    {loadingRole === 'admin' ? 'Entrando...' : 'Ingresar como Administrador →'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* ================= CARD 2: TÉCNICO ================= */}
              <View
                // @ts-ignore
                className="promant-card-box"
                style={{
                  backgroundColor: 'rgba(16, 24, 40, 0.75)',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: 16,
                  padding: 24,
                  gap: 20,
                  position: 'relative',
                  overflow: 'hidden',
                  justifyContent: 'space-between',
                }}
              >
                {/* Acento de rol ámbar (#FBBF24) */}
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 24,
                    width: 64,
                    height: 2,
                    backgroundColor: '#FBBF24',
                    opacity: 0.8,
                  }}
                />

                <View style={{ gap: 16 }}>
                  {/* Identificador de rol */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: 48,
                    }}
                  >
                    {/* Emblema ámbar */}
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        backgroundColor: 'rgba(217, 119, 6, 0.102)',
                        borderWidth: 1,
                        borderColor: 'rgba(251, 191, 36, 0.188)',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Ionicons name="construct" size={22} color="#FBBF24" />
                    </View>

                    {/* Tag Rol */}
                    <View
                      style={{
                        backgroundColor: 'rgba(217, 119, 6, 0.12)',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 6,
                        borderWidth: 1,
                        borderColor: 'rgba(251, 191, 36, 0.25)',
                      }}
                    >
                      <Text style={{ color: '#FBBF24', fontSize: 10, fontWeight: '600', letterSpacing: 0.8 }}>
                        ROL: TÉCNICO
                      </Text>
                    </View>
                  </View>

                  {/* Perfil de demostración */}
                  <View style={{ gap: 4 }}>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: '600',
                        color: '#F1F5F9',
                        letterSpacing: -0.6,
                      }}
                    >
                      Técnico
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#D5DFEB' }}>
                      Carlos Mendoza
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: '400', color: '#7F90A8' }}>
                      carlos.mendoza@promant.com
                    </Text>

                    {/* Resumen de permisos */}
                    <Text
                      style={{
                        fontSize: 13,
                        lineHeight: 21,
                        color: '#94A3B8',
                        marginTop: 10,
                      }}
                    >
                      Lleva el control de tus servicios con bitácoras de campo y cotizaciones en sitio.
                    </Text>
                  </View>

                  {/* Herramientas incluidas */}
                  <View style={{ gap: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Ionicons name="checkmark" size={14} color="#FBBF24" />
                      <Text style={{ color: '#94A3B8', fontSize: 12 }}>Bitácoras y evidencias de campo</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Ionicons name="checkmark" size={14} color="#FBBF24" />
                      <Text style={{ color: '#94A3B8', fontSize: 12 }}>Elaboración de cotizaciones</Text>
                    </View>
                  </View>
                </View>

                {/* Botón CTA (Figma: Height 48px, Background #D97706, Radius 8px) */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  disabled={loadingRole !== null}
                  onPress={() => handleSelectRole('empleado', '/empleado-panel')}
                  style={{
                    height: 48,
                    backgroundColor: loadingRole === 'empleado' ? '#475569' : '#D97706',
                    borderWidth: 1,
                    borderColor: 'rgba(251, 191, 36, 0.333)',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 8,
                  }}
                >
                  <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 13 }}>
                    {loadingRole === 'empleado' ? 'Entrando...' : 'Ingresar como Técnico →'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* ================= CARD 3: CLIENTE ================= */}
              <View
                // @ts-ignore
                className="promant-card-box"
                style={{
                  backgroundColor: 'rgba(16, 24, 40, 0.75)',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: 16,
                  padding: 24,
                  gap: 20,
                  position: 'relative',
                  overflow: 'hidden',
                  justifyContent: 'space-between',
                }}
              >
                {/* Acento de rol verde (#34D399) */}
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 24,
                    width: 64,
                    height: 2,
                    backgroundColor: '#34D399',
                    opacity: 0.8,
                  }}
                />

                <View style={{ gap: 16 }}>
                  {/* Identificador de rol */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: 48,
                    }}
                  >
                    {/* Emblema verde */}
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        backgroundColor: 'rgba(5, 150, 105, 0.102)',
                        borderWidth: 1,
                        borderColor: 'rgba(52, 211, 153, 0.188)',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Ionicons name="business" size={22} color="#34D399" />
                    </View>

                    {/* Tag Rol */}
                    <View
                      style={{
                        backgroundColor: 'rgba(5, 150, 105, 0.12)',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 6,
                        borderWidth: 1,
                        borderColor: 'rgba(52, 211, 153, 0.25)',
                      }}
                    >
                      <Text style={{ color: '#34D399', fontSize: 10, fontWeight: '600', letterSpacing: 0.8 }}>
                        ROL: CLIENTE
                      </Text>
                    </View>
                  </View>

                  {/* Perfil de demostración */}
                  <View style={{ gap: 4 }}>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: '600',
                        color: '#F1F5F9',
                        letterSpacing: -0.6,
                      }}
                    >
                      Cliente
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#D5DFEB' }}>
                      Mariana Treviño
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: '400', color: '#7F90A8' }}>
                      OXXO
                    </Text>

                    {/* Resumen de permisos */}
                    <Text
                      style={{
                        fontSize: 13,
                        lineHeight: 21,
                        color: '#94A3B8',
                        marginTop: 10,
                      }}
                    >
                      Reporta incidencias con fotos y da seguimiento a cada solicitud de mantenimiento.
                    </Text>
                  </View>

                  {/* Herramientas incluidas */}
                  <View style={{ gap: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Ionicons name="checkmark" size={14} color="#34D399" />
                      <Text style={{ color: '#94A3B8', fontSize: 12 }}>Tickets con evidencia fotográfica</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Ionicons name="checkmark" size={14} color="#34D399" />
                      <Text style={{ color: '#94A3B8', fontSize: 12 }}>Seguimiento de solicitudes</Text>
                    </View>
                  </View>
                </View>

                {/* Botón CTA (Figma: Height 48px, Background #059669, Radius 8px) */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  disabled={loadingRole !== null}
                  onPress={() => handleSelectRole('cliente', '/cliente-panel')}
                  style={{
                    height: 48,
                    backgroundColor: loadingRole === 'cliente' ? '#475569' : '#059669',
                    borderWidth: 1,
                    borderColor: 'rgba(52, 211, 153, 0.333)',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 8,
                  }}
                >
                  <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 13 }}>
                    {loadingRole === 'cliente' ? 'Entrando...' : 'Ingresar como Cliente →'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* ========================================================
              3. HERRAMIENTAS DE LA DEMO / FOOTER (Figma: Gap 24px)
          ======================================================== */}
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
              <Ionicons name="refresh" size={14} color="#B4C1D3" style={{ marginRight: 8 }} />
              <Text style={{ color: '#B4C1D3', fontSize: 12, fontWeight: '500' }}>
                Restablecer datos de prueba
              </Text>
            </TouchableOpacity>

            <Text style={{ color: '#7F90A8', fontSize: 11, fontWeight: '400' }}>
              v1.0 • ProMant Demo Environment
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
