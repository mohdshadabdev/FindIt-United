
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// This function will be used to initialize the admin user
serve(async (req) => {
  // Get the authorization header
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(
      JSON.stringify({
        error: 'No authorization header',
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  // Create Supabase client with admin key
  const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    // Check if admin user already exists
    const { data: existingUser, error: existingUserError } = await supabase
      .from('profiles')
      .select('*')
      .eq('student_id', 'UU00000000')
      .single()

    if (existingUser) {
      return new Response(
        JSON.stringify({
          message: 'Admin user already exists',
          user: existingUser,
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }

    // Create admin user if not exists
    const { data: user, error } = await supabase.auth.admin.createUser({
      email: 'admin@united.edu',
      password: 'admin123',
      email_confirm: true,
    })

    if (error) throw error

    if (user.user) {
      // Create admin profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: user.user.id,
          name: 'Administrator',
          student_id: 'UU00000000', // Admin student ID
        })

      if (profileError) throw profileError

      return new Response(
        JSON.stringify({
          message: 'Admin user created successfully',
          user: user.user,
        }),
        {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }

    return new Response(
      JSON.stringify({
        error: 'Failed to create admin user',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
})
