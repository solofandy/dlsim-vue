
import { humanized_time_span } from '@/service/time-span';

export class GithubCommit {
  public get at(): string {
    return humanized_time_span(this.date);
  }
  public static fromApiCommit(c: any): GithubCommit {
    const commit = new GithubCommit();
    commit.sha = c.commit.tree.sha;
    commit.committer = c.commit.committer.name;
    commit.email = c.commit.committer.email;
    commit.message = c.commit.message;
    commit.date = new Date(c.commit.committer.date);
    return commit;
  }
  public sha: string = new Date().getTime().toString();
  public committer: string = '';
  public email: string = '';
  public date: Date = new Date();
  public message: string = '';
}
