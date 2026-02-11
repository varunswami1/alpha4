export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      app_ratings: {
        Row: {
          created_at: string | null
          feedback: string | null
          id: string
          rating: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          feedback?: string | null
          id?: string
          rating: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          feedback?: string | null
          id?: string
          rating?: number
          user_id?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_approved: boolean | null
          likes_count: number | null
          parent_id: string | null
          post_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          likes_count?: number | null
          parent_id?: string | null
          post_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          likes_count?: number | null
          parent_id?: string | null
          post_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          comment_id: string | null
          created_at: string | null
          id: string
          post_id: string | null
          user_id: string
        }
        Insert: {
          comment_id?: string | null
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id: string
        }
        Update: {
          comment_id?: string | null
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string | null
          related_plant_id: string | null
          related_post_id: string | null
          related_user_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          related_plant_id?: string | null
          related_post_id?: string | null
          related_user_id?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          related_plant_id?: string | null
          related_post_id?: string | null
          related_user_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_related_plant_id_fkey"
            columns: ["related_plant_id"]
            isOneToOne: false
            referencedRelation: "user_plants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_related_post_id_fkey"
            columns: ["related_post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      plant_care_logs: {
        Row: {
          care_type: string
          created_at: string | null
          id: string
          notes: string | null
          photo_url: string | null
          user_id: string
          user_plant_id: string
        }
        Insert: {
          care_type: string
          created_at?: string | null
          id?: string
          notes?: string | null
          photo_url?: string | null
          user_id: string
          user_plant_id: string
        }
        Update: {
          care_type?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          photo_url?: string | null
          user_id?: string
          user_plant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plant_care_logs_user_plant_id_fkey"
            columns: ["user_plant_id"]
            isOneToOne: false
            referencedRelation: "user_plants"
            referencedColumns: ["id"]
          },
        ]
      }
      plants: {
        Row: {
          care_fertilizer: string | null
          care_humidity: string | null
          care_light: string | null
          care_soil: string | null
          care_temperature: string | null
          care_water: string | null
          category: string | null
          climate: string[] | null
          created_at: string | null
          description: string | null
          difficulty: string | null
          humidity_max: number | null
          humidity_min: number | null
          id: string
          image_url: string | null
          is_indoor: boolean | null
          is_outdoor: boolean | null
          name: string
          scientific_name: string | null
          size_height: number | null
          size_width: number | null
          sunlight: string[] | null
          updated_at: string | null
        }
        Insert: {
          care_fertilizer?: string | null
          care_humidity?: string | null
          care_light?: string | null
          care_soil?: string | null
          care_temperature?: string | null
          care_water?: string | null
          category?: string | null
          climate?: string[] | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          humidity_max?: number | null
          humidity_min?: number | null
          id?: string
          image_url?: string | null
          is_indoor?: boolean | null
          is_outdoor?: boolean | null
          name: string
          scientific_name?: string | null
          size_height?: number | null
          size_width?: number | null
          sunlight?: string[] | null
          updated_at?: string | null
        }
        Update: {
          care_fertilizer?: string | null
          care_humidity?: string | null
          care_light?: string | null
          care_soil?: string | null
          care_temperature?: string | null
          care_water?: string | null
          category?: string | null
          climate?: string[] | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          humidity_max?: number | null
          humidity_min?: number | null
          id?: string
          image_url?: string | null
          is_indoor?: boolean | null
          is_outdoor?: boolean | null
          name?: string
          scientific_name?: string | null
          size_height?: number | null
          size_width?: number | null
          sunlight?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          comments_count: number | null
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          is_approved: boolean | null
          is_reported: boolean | null
          likes_count: number | null
          post_type: string | null
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          comments_count?: number | null
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_approved?: boolean | null
          is_reported?: boolean | null
          likes_count?: number | null
          post_type?: string | null
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          comments_count?: number | null
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_approved?: boolean | null
          is_reported?: boolean | null
          likes_count?: number | null
          post_type?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          created_at: string | null
          currency: string | null
          description: string | null
          discount_percent: number | null
          discounted_price: number | null
          external_url: string
          free_shipping: boolean | null
          id: string
          image_url: string | null
          images: string[] | null
          is_active: boolean | null
          is_featured: boolean | null
          name: string
          price: number | null
          rating: number | null
          retailer_name: string | null
          reviews_count: number | null
          stock_status: string | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          discount_percent?: number | null
          discounted_price?: number | null
          external_url: string
          free_shipping?: boolean | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          name: string
          price?: number | null
          rating?: number | null
          retailer_name?: string | null
          reviews_count?: number | null
          stock_status?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          discount_percent?: number | null
          discounted_price?: number | null
          external_url?: string
          free_shipping?: boolean | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          name?: string
          price?: number | null
          rating?: number | null
          retailer_name?: string | null
          reviews_count?: number | null
          stock_status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address_line: string | null
          avatar_url: string | null
          bio: string | null
          city: string | null
          created_at: string | null
          district: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone_number: string | null
          pincode: string | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          address_line?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string | null
          district?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone_number?: string | null
          pincode?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          address_line?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string | null
          district?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone_number?: string | null
          pincode?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          code: string
          created_at: string | null
          id: string
          user_id: string
          uses_count: number | null
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          user_id: string
          uses_count?: number | null
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          user_id?: string
          uses_count?: number | null
        }
        Relationships: []
      }
      referral_uses: {
        Row: {
          created_at: string | null
          id: string
          referral_code_id: string
          referred_user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          referral_code_id: string
          referred_user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          referral_code_id?: string
          referred_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_uses_referral_code_id_fkey"
            columns: ["referral_code_id"]
            isOneToOne: false
            referencedRelation: "referral_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_follows: {
        Row: {
          created_at: string | null
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      user_plants: {
        Row: {
          acquired_date: string | null
          created_at: string | null
          custom_name: string | null
          health_status: string | null
          id: string
          last_fertilized: string | null
          last_watered: string | null
          location: string | null
          nickname: string | null
          notes: string | null
          photo_url: string | null
          plant_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          acquired_date?: string | null
          created_at?: string | null
          custom_name?: string | null
          health_status?: string | null
          id?: string
          last_fertilized?: string | null
          last_watered?: string | null
          location?: string | null
          nickname?: string | null
          notes?: string | null
          photo_url?: string | null
          plant_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          acquired_date?: string | null
          created_at?: string | null
          custom_name?: string | null
          health_status?: string | null
          id?: string
          last_fertilized?: string | null
          last_watered?: string | null
          location?: string | null
          nickname?: string | null
          notes?: string | null
          photo_url?: string | null
          plant_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_plants_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          account_visibility: string | null
          created_at: string | null
          currency: string | null
          email_notifications: boolean | null
          font_size: string | null
          id: string
          language: string | null
          push_notifications: boolean | null
          theme: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_visibility?: string | null
          created_at?: string | null
          currency?: string | null
          email_notifications?: boolean | null
          font_size?: string | null
          id?: string
          language?: string | null
          push_notifications?: boolean | null
          theme?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_visibility?: string | null
          created_at?: string | null
          currency?: string | null
          email_notifications?: boolean | null
          font_size?: string | null
          id?: string
          language?: string | null
          push_notifications?: boolean | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
