
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import SCEObjectCard from '@/components/objects/SCEObjectCard';
import PostCard from '@/components/posts/PostCard';
import { getSCEObjects, getPosts } from '@/lib/mock-data';
import { SCEObject, Post } from '@/lib/types';
import { AlertCircle, FileText, Shield, Info, ArrowRight } from 'lucide-react';

const Index = () => {
  const [latestObjects, setLatestObjects] = useState<SCEObject[]>([]);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);

  useEffect(() => {
    // Load latest SCE objects and posts
    const objects = getSCEObjects().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 3);
    
    const posts = getPosts().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    // Find a featured post
    const featured = posts.find(post => post.featured) || null;
    
    // Set latest posts excluding the featured one
    const latest = posts
      .filter(post => !post.featured || (featured && post.id !== featured.id))
      .slice(0, 3);
    
    setLatestObjects(objects);
    setLatestPosts(latest);
    setFeaturedPost(featured);
  }, []);

  return (
    <Layout>
      <div className="bg-sce-primary text-white py-12 md:py-20">
        <div className="sce-container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 sce-logo">SCE ФОНД</h1>
          <p className="text-xl md:text-2xl mb-6">Secure. Control. Explore.</p>
          <p className="max-w-3xl mx-auto text-lg">
            Организация по обеспечению безопасности, контролю и исследованию аномальных объектов и явлений.
          </p>
        </div>
      </div>

      {/* Featured alert */}
      <div className="sce-container my-6">
        <Card className="border-l-4 border-l-sce-primary bg-sce-highlight">
          <CardContent className="p-4 flex gap-3">
            <AlertCircle className="h-6 w-6 text-sce-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold">Внимание! Информация строго конфиденциальна</h3>
              <p className="text-sm text-gray-700 mt-1">
                Доступ к материалам данного сайта ограничен. Несанкционированное распространение информации преследуется по закону.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content */}
      <div className="sce-container py-8">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-sce-primary" />
              Важное сообщение
            </h2>
            <Card className="border-2 border-sce-primary shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl md:text-2xl">{featuredPost.title}</CardTitle>
                  <Badge className="bg-sce-primary">Важно</Badge>
                </div>
                <CardDescription>
                  Опубликовано: {new Date(featuredPost.createdAt).toLocaleDateString('ru-RU')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">
                  {featuredPost.content.length > 500
                    ? `${featuredPost.content.substring(0, 500)}...`
                    : featuredPost.content}
                </p>
              </CardContent>
              <CardFooter>
                <Link to={`/posts/${featuredPost.id}`}>
                  <Button className="bg-sce-primary hover:bg-sce-accent">
                    Читать полностью <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Latest SCE Objects */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-sce-primary" />
              Последние SCE объекты
            </h2>
            <div className="space-y-4">
              {latestObjects.length > 0 ? (
                latestObjects.map(object => (
                  <SCEObjectCard key={object.id} object={object} />
                ))
              ) : (
                <Card className="text-center p-6">
                  <p className="text-gray-500">Объекты SCE не найдены</p>
                </Card>
              )}
            </div>
            <div className="mt-4 text-center">
              <Link to="/objects">
                <Button variant="outline" className="text-sce-primary hover:text-white hover:bg-sce-primary">
                  Все объекты <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Latest Posts */}
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-sce-primary" />
              Новости
            </h2>
            <div className="space-y-4">
              {latestPosts.length > 0 ? (
                latestPosts.map(post => (
                  <Card key={post.id} className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {post.content.substring(0, 100)}...
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Link to={`/posts/${post.id}`} className="text-sce-primary text-sm hover:underline">
                        Читать полностью
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card className="text-center p-6">
                  <p className="text-gray-500">Новости не найдены</p>
                </Card>
              )}
            </div>
            <div className="mt-4 text-center">
              <Link to="/posts">
                <Button variant="outline" className="text-sce-primary hover:text-white hover:bg-sce-primary">
                  Все новости <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Separator className="my-6" />

            {/* About SCE Foundation */}
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Info className="h-6 w-6 text-sce-primary" />
              О Фонде
            </h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600 mb-4">
                  Фонд SCE - засекреченная организация, занимающаяся обнаружением, содержанием и исследованием аномальных объектов и явлений.
                </p>
                <p className="text-sm text-gray-600">
                  Наша миссия - обеспечение безопасности человечества от паранормальных угроз.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/about">
                  <Button variant="outline" className="text-sce-primary hover:text-white hover:bg-sce-primary w-full">
                    Подробнее о нас
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
