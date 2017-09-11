export function checkOwner(user, campaign){
    if (user != null && campaign != null && campaign.owner != null){


        return user.id === campaign.owner.id
    }
    return false
}
