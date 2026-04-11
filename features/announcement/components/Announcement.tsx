import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function Announcement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Announcements</h1>
      </div>

      {/* Banner Section */}
      <div className="rounded-lg overflow-hidden border border-border">
        <div className="relative h-64 w-full bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="h-40 w-40 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">BCWD</p>
                  <p className="text-sm text-primary">Baybay City Water District</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-foreground">Site announcements</h2>

      {/* Announcements Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <Card key={item} className="border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative h-48 w-full bg-muted">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded text-xs">
                2 more
              </div>
            </div>
            <CardHeader>
              <h3 className="font-bold text-foreground">Baybay City Water District</h3>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Featured Post */}
      <Card className="border-border mt-8">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-10 w-10 rounded-full bg-primary/20" />
            <div>
              <p className="font-bold text-foreground">Baybay City Water District</p>
              <p className="text-xs text-muted-foreground">Official Page</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Sample thumbnail grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="h-24 bg-muted rounded-md" />
            <div className="h-24 bg-muted rounded-md" />
            <div className="h-24 bg-muted rounded-md relative">
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-md">
                <p className="text-white font-bold">+3</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg text-foreground mb-2">
              The Baybay City Water District (BCWD) conducted a visitation and inspection to the billeting shool to as...
            </h3>
            <div className="flex items-center gap-2 text-blue-600">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-medium">Facebook</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
