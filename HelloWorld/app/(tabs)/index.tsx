import React, { useState } from 'react';
import { Image } from 'expo-image';
import { 
  Platform, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Alert 
} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window');

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  colors: string[];
}

// Mock product data with better color schemes
const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Spring Meadow Bouquet',
    price: 45.99,
    image: 'https://via.placeholder.com/300x200/F8BBD9/000000?text=Spring+Bouquet',
    description: 'Delicate fuzzy wire flowers in soft pastel colors',
    colors: ['#F8BBD9', '#B8E6B8', '#E6E6FA']
  },
  {
    id: 2,
    name: 'Rustic Charm Bouquet',
    price: 39.99,
    image: 'https://via.placeholder.com/300x200/D4A574/000000?text=Rustic+Bouquet',
    description: 'Warm earth tones with textured fuzzy wire stems',
    colors: ['#D4A574', '#8B7355', '#F5DEB3']
  },
  {
    id: 3,
    name: 'Elegant Evening Bouquet',
    price: 52.99,
    image: 'https://via.placeholder.com/300x200/9B59B6/FFFFFF?text=Elegant+Bouquet',
    description: 'Sophisticated dark tones perfect for special occasions',
    colors: ['#9B59B6', '#8E44AD', '#D5A6BD']
  }
];

export default function HomeScreen() {
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
    Alert.alert('Added to Cart! 🛒', `${product.name} has been added to your cart.`);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <ThemedView style={styles.productCard}>
      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(product.id)}
      >
        <ThemedText style={[
          styles.favoriteIcon,
          { color: favorites.has(product.id) ? '#E74C3C' : '#BDC3C7' }
        ]}>
          ♥
        </ThemedText>
      </TouchableOpacity>
      
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        contentFit="cover"
      />
      
      <ThemedView style={styles.productInfo}>
        <ThemedText type="defaultSemiBold" style={styles.productName}>
          {product.name}
        </ThemedText>
        <ThemedText style={styles.productDescription}>
          {product.description}
        </ThemedText>
        
        <ThemedView style={styles.colorContainer}>
          {product.colors.map((color: string, index: number) => (
            <ThemedView 
              key={index}
              style={[styles.colorDot, { backgroundColor: color }]}
            />
          ))}
        </ThemedView>
        
        <ThemedView style={styles.priceContainer}>
          <ThemedText type="defaultSemiBold" style={styles.price}>
            ${product.price}
          </ThemedText>
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={() => addToCart(product)}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.addToCartText}>Add to Cart</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F0F8FF', dark: '#2C3E50' }}
      headerImage={
        <ThemedView style={styles.headerContent}>
          <Image
            source={{ uri: 'https://via.placeholder.com/400x250/3498DB/FFFFFF?text=Fuzzy+Wire+Bouquets' }}
            style={styles.heroImage}
            contentFit="cover"
          />
          <ThemedView style={styles.headerOverlay}>
            <ThemedText type="title" style={styles.headerTitle}>
              Fuzzy Wire Bouquets 🌸
            </ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              Handcrafted • Everlasting • Beautiful
            </ThemedText>
          </ThemedView>
        </ThemedView>
      }>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.welcomeText}>Welcome to Our Shop!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.statsContainer}>
        <ThemedView style={styles.statItem}>
          <ThemedText type="defaultSemiBold" style={styles.statNumber}>500+</ThemedText>
          <ThemedText style={styles.statLabel}>Happy Customers</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statItem}>
          <ThemedText type="defaultSemiBold" style={styles.statNumber}>50+</ThemedText>
          <ThemedText style={styles.statLabel}>Unique Designs</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statItem}>
          <ThemedText type="defaultSemiBold" style={styles.statNumber}>∞</ThemedText>
          <ThemedText style={styles.statLabel}>Lasting Beauty</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          ✨ Featured Bouquets
        </ThemedText>
        <ThemedText style={styles.sectionDescription}>
          Each bouquet is carefully handcrafted with premium fuzzy wire, designed to last forever and bring joy to any space.
        </ThemedText>
      </ThemedView>

      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          🌟 Why Choose Fuzzy Wire?
        </ThemedText>
        <ThemedView style={styles.featuresList}>
          <ThemedView style={styles.featureItem}>
            <ThemedView style={styles.featureIconContainer}>
              <ThemedText style={styles.featureIcon}>🌸</ThemedText>
            </ThemedView>
            <ThemedText style={styles.featureText}>Never wilts or fades</ThemedText>
          </ThemedView>
          <ThemedView style={styles.featureItem}>
            <ThemedView style={styles.featureIconContainer}>
              <ThemedText style={styles.featureIcon}>🎨</ThemedText>
            </ThemedView>
            <ThemedText style={styles.featureText}>Customizable colors</ThemedText>
          </ThemedView>
          <ThemedView style={styles.featureItem}>
            <ThemedView style={styles.featureIconContainer}>
              <ThemedText style={styles.featureIcon}>♻️</ThemedText>
            </ThemedView>
            <ThemedText style={styles.featureText}>Eco-friendly materials</ThemedText>
          </ThemedView>
          <ThemedView style={styles.featureItem}>
            <ThemedView style={styles.featureIconContainer}>
              <ThemedText style={styles.featureIcon}>💝</ThemedText>
            </ThemedView>
            <ThemedText style={styles.featureText}>Perfect for gifts</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.ctaContainer}>
        <ThemedText type="subtitle" style={styles.ctaTitle}>
          Ready to Order? 🛍️
        </ThemedText>
        <ThemedText style={styles.ctaDescription}>
          Contact us for custom orders or browse our full collection
        </ThemedText>
        <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
          <ThemedText style={styles.ctaButtonText}>Shop All Bouquets</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {cart.length > 0 && (
        <ThemedView style={styles.cartSummary}>
          <ThemedText type="defaultSemiBold" style={styles.cartText}>
            🛒 Cart: {cart.length} item(s)
          </ThemedText>
          <TouchableOpacity style={styles.viewCartButton} activeOpacity={0.8}>
            <ThemedText style={styles.viewCartText}>View Cart</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    height: '100%',
    width: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  headerTitle: {
    color: '#2C3E50',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 24,
  },
  welcomeText: {
    color: '#2C3E50',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(52, 152, 219, 0.05)',
    paddingVertical: 20,
    borderRadius: 16,
    marginHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    color: '#3498DB',
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
    color: '#7F8C8D',
    fontWeight: '500',
  },
  sectionContainer: {
    marginVertical: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    marginBottom: 12,
    color: '#2C3E50',
    fontSize: 20,
  },
  sectionDescription: {
    lineHeight: 22,
    color: '#7F8C8D',
    fontSize: 16,
  },
  productCard: {
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  favoriteIcon: {
    fontSize: 22,
  },
  productImage: {
    width: '100%',
    height: 220,
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 20,
    marginBottom: 8,
    color: '#2C3E50',
  },
  productDescription: {
    marginBottom: 16,
    lineHeight: 20,
    color: '#7F8C8D',
    fontSize: 15,
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  colorDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ECF0F1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    color: '#27AE60',
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#3498DB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#3498DB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addToCartText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  featuresList: {
    gap: 16,
    marginTop: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'rgba(52, 152, 219, 0.03)',
    padding: 16,
    borderRadius: 12,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 20,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500',
  },
  ctaContainer: {
    marginVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(231, 76, 60, 0.05)',
    paddingVertical: 32,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  ctaTitle: {
    marginBottom: 12,
    textAlign: 'center',
    color: '#2C3E50',
    fontSize: 22,
  },
  ctaDescription: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#7F8C8D',
    fontSize: 16,
    lineHeight: 22,
  },
  ctaButton: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 36,
    paddingVertical: 18,
    borderRadius: 28,
    shadowColor: '#E74C3C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  ctaButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  cartSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 20,
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(46, 204, 113, 0.2)',
  },
  cartText: {
    color: '#27AE60',
    fontSize: 16,
  },
  viewCartButton: {
    backgroundColor: '#27AE60',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#27AE60',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  viewCartText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});