import { Code, GitBranch, Heart } from "lucide-react"

export default function OpenSource() {
    return (
        <div className="flex flex-col items-start justify-start px-8 py-12 md:py-24 max-w-4xl">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Code className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Fully Open Source
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
                Kontrol is designed to be the transparent heart of your laboratory infrastructure. 
                We believe that critical infrastructure should be auditable, extendable, and free from vendor lock-in.
            </p>
            
            <div className="grid gap-8 md:grid-cols-2 mt-8">
                <div className="bg-muted/30 p-6 rounded-xl border">
                    <div className="flex items-center gap-3 mb-4">
                        <GitBranch className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-semibold">Community Driven</h3>
                    </div>
                    <p className="text-muted-foreground">
                        Our codebase is publicly available on GitHub. We welcome contributions, feature requests, and bug reports from the community.
                        You can fork the project, inspection the code, and even build your own custom versions.
                    </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-xl border">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-semibold">Self-Hostable</h3>
                    </div>
                    <p className="text-muted-foreground">
                        While we offer managed versions, Kontrol is built to be self-hosted. 
                        You can run the entire stack on your own hardware, keeping your data and metadata completely within your control.
                        Perfect for air-gapped or high-security environments.
                    </p>
                </div>
            </div>

            <div className="prose dark:prose-invert max-w-none mt-10">
                <h3 className="text-2xl font-semibold mb-4">Why Open Source?</h3>
                <p>
                    In scientific and research environments, reproducibility and transparency are paramount. 
                    Proprietary "black boxes" can hide issues or disappear when a company changes direction. 
                    By choosing open source, you ensure that your lab's operating system is as verifiable as your research data.
                </p>
            </div>
        </div>
    )
}
